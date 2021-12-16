import pyodbc
import datetime

class DatabaseManager:
    # cnxn = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
    #                       "Server=IT15007;"
    #                       "Database=wypozyczalnia_lodzie;"
    #                       "Trusted_Connection=yes;")

    cnxn = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                          "Server=DJA-XPS;"
                          "Database=wypozyczalnia_lodzie;"
                          "Trusted_Connection=yes;")

    @classmethod
    def get_all_users(cls):
        cursor = cls.cnxn.cursor()
        cursor.execute('SELECT * FROM dbo.Users')
        for row in cursor:
            print('row = %r' % (row,))

    @classmethod
    def get_all_reservations(cls):
        cursor = cls.cnxn.cursor()
        cursor.execute('SELECT * FROM dbo.Wypozyczenia')
        for row in cursor:
            print('row = %r' % (row,))

    @classmethod
    def get_all_available_boats_filtered_by_date(cls, date_range_json):
        try:
            print(f'Trying to get available boats with date filter: {str(date_range_json)}')
            cursor = cls.cnxn.cursor()
            cursor.execute('SELECT * FROM dbo.Wypozyczenia WHERE dbo.Wypozyczenia.OD > ? and dbo.Wypozyczenia.DO < ?',
                           cls.get_datetime_from_string(date_range_json['date_from']),
                           cls.get_datetime_from_string(date_range_json['date_to']))
            for row in cursor:
                # print('row = %r' % (row,))
                print(row)
                print(row[0])
                print(type(row))
        except Exception as ex:
            print(f'Something went wrong with getting available boats filtered by date. Trace:\n{ex}')

    @classmethod
    def get_datetime_from_string(cls, date_string):
        try:
            print(f'Trying to parse date string: {date_string} to datetime object')
            datetime_object = datetime.datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
            return datetime_object
        except Exception as ex:
            print(f'Something went wrong with parsing string to datetime object. Trace:\n{ex}')
            return None


def main():
    DatabaseManager.get_all_available_boats_filtered_by_date({'date_from': '2021-12-01 00:00:00',
                                                              'date_to': '2021-12-31 00:00:00'})


if __name__ == '__main__':
    main()



# cursor.execute("insert into Users (ID_User, Imie, Nazwisko, Numer_Telefonu, Email) values (5, 'Zephania','Harrison', '123456789','leo@mattisCraseget.com')")
