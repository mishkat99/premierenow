from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

url = 'https://www.metacritic.com/feature/tv-premiere-dates'

headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
}

# page = get('https://www.metacritic.com/feature/tv-premiere-dates', headers=headers)
# html = page.content

# f = open("test.html", "wb");
# f.write(html);
# f.close();

with open('test.html') as page:
	soup = BeautifulSoup(page, features="html.parser");

elements = soup.find_all("table", "listtable linedtable");
# premiere_list = elements.find_all("tr","sublistbig");

shows = [];

for child in elements:
	end_of_tree = False;
	raw_date = child.tr;
	date = raw_date.th.string;

	print("DATE ELEMENT: ", date);

	next_el = raw_date.find_next_sibling('tr', 'even');

	while not end_of_tree:
		while next_el['class'] != ['sublistbig']:
			if (next_el['class'] == ['even']):
				show_name = next_el.find('td', 'title');
				print("SHOW NAME: ", show_name);

			next_el = next_el.find_next_sibling('tr');
			print("NEXT TR ELEMENT: ", next_el);
			if next_el is None:
					end_of_tree = True;
					break;
			while next_el.has_attr('class') == False: 
				next_el = next_el.find_next_sibling('tr');
				print("NEXT TR 2 ELEMENT: ", next_el);
				if next_el is None:
					print("ENDED");
					end_of_tree = True;
					break;
			if end_of_tree:
				print("ENDED");
				break;
			# print("NEXT TR CLASS: ", next_el['class']);
		if end_of_tree:
			print("ENDED");
			break;
		date = next_el.th.string;
		print("NEXT DATE ELEMENT: ", date);
		next_el = next_el.find_next_sibling('tr', 'even');

		print("NEXT ELEMENT: ", next_el);



	# while next_date != 'tbody':
	# 	if next_date.next_sibling is None:
	# 		next_date = next_date.find_next_sibling('tr');

	# 	next_date = next_date.next_sibling;
	# 	print(next_date);


	# raw_dates = child.find_all('tr','sublistbig');
	# for date_el in raw_dates:
	# 	print(date_el)
	# 	print(date_el.next_sibling);

	# date = raw_date.th.string;
	# print(date);