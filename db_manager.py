import pyodbc
cnxn = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                      "Server=IT15007;"
                      "Database=test_html;"
                      "Trusted_Connection=yes;")


cursor = cnxn.cursor()
cursor.execute('SELECT * FROM dbo.test')

for row in cursor:
    print('row = %r' % (row,))