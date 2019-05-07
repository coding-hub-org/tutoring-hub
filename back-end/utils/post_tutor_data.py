import xlrd
from datetime import datetime
import requests

if __name__ == '__main__':
	data_file = "./tutors.xlsx"

	wb = xlrd.open_workbook(data_file)
	sheet = wb.sheet_by_index(0)

	for j in range(1, sheet.nrows):

		sheet_data = sheet.row_values(j)

		data = {
			"courses": [],
			"imageUrl": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
			"firstName": '',
			"lastName": '',
			"major": '',
			"since": '',
			"reviews": [],
		}

		for i in range(3, 10):
			if not (sheet_data[i] == ""):
				data["courses"].append(sheet_data[i])

		data["firstName"] = sheet_data[1]

		data["lastName"] = sheet_data[0]

		excel_date = int(sheet_data[2])
		dt = datetime.fromordinal(datetime(1900, 1, 1).toordinal() + excel_date - 2)
		day = dt.strftime("%Y/%b")
		data["since"] = day

		if len(data["courses"]):
			r = requests.post(url='http://localhost:3001/api/v1/tutors/create', data=data)