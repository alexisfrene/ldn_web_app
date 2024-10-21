interface registerUserValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  username: string;
  birthday_date: string | Date;
}

interface loginUserValues {
  password: string;
  email_or_user: string;
}
