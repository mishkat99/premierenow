from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

url = 'https://www.metacritic.com/feature/tv-premiere-dates'

headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
}

# page = get(url, headers=headers)
# html = page.content

# soup = BeautifulSoup(html,'html.parser');
# elements = soup.find_all("table", "listtable linedtable");


with open('test.html') as page:
	soup = BeautifulSoup(page, features="html.parser");

elements = soup.find_all("table", "listtable linedtable");

shows = [];

for child in elements:
	end_of_tree = False;
	raw_date = child.tr;
	date = raw_date.th.string.split('/')[1].strip();

	next_el = raw_date.find_next_sibling('tr', 'even');

	while not end_of_tree:
		while next_el['class'] != ['sublistbig']:
			if (next_el['class'] == ['even']):
				show_el = next_el.find('td', 'title');
				show_name = show_el.findAll(text=True);
				show = {
					'date': date,
					'show': show_name[0].strip()
				}
				shows.append(show);
			next_el = next_el.find_next_sibling('tr');
			if next_el is None:
					end_of_tree = True;
					break;
			while next_el.has_attr('class') == False: 
				next_el = next_el.find_next_sibling('tr');
				if next_el is None:
					end_of_tree = True;
					break;
			if end_of_tree:
				break;
		if end_of_tree:
			break;
		date = next_el.th.string.split('/')[1].strip();
		next_el = next_el.find_next_sibling('tr', 'even');

print(shows);