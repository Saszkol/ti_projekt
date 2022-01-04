import pyodbc
import datetime

class DatabaseManager:
    cnxn = pyodbc.connect("Driver={ODBC Driver 17 for SQL Server};"
                          "Server=IT15007;"
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
        cursor.execute('SELECT * FROM dbo.Rezerwacja')
        for row in cursor:
            print('row = %r' % (row,))

    @classmethod
    def get_all_available_boats_filtered_by_date(cls, date_range_json):
        try:
            print(f'Trying to get available boats with date filter: {str(date_range_json)}')
            cursor = cls.cnxn.cursor()

            # (StartA <= EndB) and (EndA >= StartB)

            cursor.execute('select * from dbo.Lodzie a where a.ID_Lodz not in ('
                           'select l.ID_Lodz as id_lodzi from dbo.Lodzie l, dbo.Rezerwacja r '
                           'where l.ID_Lodz = r.ID_Lodz and (? <= r.rezerwacja_data_do and ? >= r.rezerwacja_data_do))',
                           cls.get_datetime_from_string(date_range_json['date_from']),
                           cls.get_datetime_from_string(date_range_json['date_to']))
            result = {}

            for row in cursor:
                print(row)
                result_element = {'id': row[0],
                                  'name': row[1].strip(),
                                  'type': row[2].strip(),
                                  'date_from': date_range_json['date_from'],
                                  'date_to': date_range_json['date_to']}
                result[f'{row[0]}'] = result_element
            return result
        except Exception as ex:
            print(f'Something went wrong with getting available boats filtered by date. Trace:\n{ex}')

    @classmethod
    def get_datetime_from_string(cls, date_string):
        try:
            print(f'Trying to parse date string: {date_string} to datetime object')
            # datetime_object = datetime.datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")
            datetime_object = datetime.datetime.strptime(date_string, "%Y-%m-%d")
            return datetime_object
        except Exception as ex:
            print(f'Something went wrong with parsing string to datetime object. Trace:\n{ex}')
            return None

    @classmethod
    def insert_user(cls, user_data):
        try:
            print(f'Trying to insert user: {user_data} to database!')
            cursor = cls.cnxn.cursor()
            cursor.execute(
                "insert into dbo.Users (Imie, Nazwisko, Numer_Telefonu, Email) values (?, ?, ?, ?)", [
                user_data['name'],
                user_data['surname'],
                user_data['phone'],
                user_data['email']
            ])
            cls.cnxn.commit()
            print('Successfully added new user to database!')
            return True
        except Exception as ex:
            print(f'Something went wrong with inserting user to database. Trace:\n{ex}')
            return False

    @classmethod
    def insert_reservation(cls, chosen_boat_data, user_data):
        try:
            print(f'Trying to insert reservation for boat: {chosen_boat_data}')

            cursor = cls.cnxn.cursor()
            cursor.execute('select * from dbo.Users a where a.Email = ?', user_data['email'])

            user_id = None

            for row in cursor:
                user_id = row[0]

            if user_id is not None:
                cursor = cls.cnxn.cursor()
                cursor.execute(
                    "insert into dbo.Rezerwacja (ID_Lodz, ID_User, rezerwacja_data_od, rezerwacja_data_do) values (?, ?, ?, ?)", [
                        chosen_boat_data['id'],
                        user_id,
                        chosen_boat_data['date_from'],
                        chosen_boat_data['date_to']
                    ])
                cls.cnxn.commit()
            else:
                return False
            print(f'Successfully added reservation!')
            return True
        except Exception as ex:
            print(f'Something went wrong with inserting reservation for boat: {chosen_boat_data}. Trace:\n{ex}')
            return False


def main():
    # DatabaseManager.get_all_available_boats_filtered_by_date({'date_from': '2021-12-01 00:00:00',
    #                                                           'date_to': '2021-12-31 00:00:00'})
    # DatabaseManager.get_all_reservations()
    pass


if __name__ == '__main__':
    main()
