import pyodbc
cnxn = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                      "Server=IT15007;"
                      "Database=wypozyczalnia_lodzie;"
                      "Trusted_Connection=yes;")


cursor = cnxn.cursor()
cursor.execute('SELECT * FROM dbo.Users')
for row in cursor:
    print('row = %r' % (row,))






# cursor.execute("insert into Users (ID_User, Imie, Nazwisko, Numer_Telefonu, Email) values (5, 'Zephania','Harrison', '123456789','leo@mattisCraseget.com')")
