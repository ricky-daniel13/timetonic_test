import {TIMETONIC_KEY} from '../Config';
import {UserState} from '../Contexts/AuthContext';

export const API_URL = 'https://timetonic.com/live/api.php';
export const IMAGE_URL = 'https://timetonic.com/live';

type LoginReturn = {
  userToken?: string;
  o_u?: string;
  sessionToken?: string;
  errorcode: number;
};

export const DoLogin = async (
  email: string,
  password: string,
): Promise<LoginReturn | null> => {
  try {
    console.log('Starting net request');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        req: 'createOauthkey',
        login: email,
        pwd: password,
        appkey: TIMETONIC_KEY,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      ('Network data gotten!');
    }

    const data = await response.json();
    // Handle the response data
    console.log(data);

    if (data.status == 'nok') {
      console.log("Nok status in data.");
      if (data.error.includes('invalid login/pwd')) {
        console.log('Bad login data, returning');
        return {
          errorcode: 1,
        };
      } else 
        throw new Error(data.error);
    }

    const sessionToken = await DoSession(data.o_u, data.oauthkey);

    if (sessionToken != null) {
      return {
        userToken: data.oauthkey,
        o_u: data.o_u,
        sessionToken: sessionToken,
        errorcode: 0,
      };
    } else
      return {
        errorcode: 2,
      };
  } catch (error: any) {
    console.error(
      'There was a problem with the fetch operation:',
      error.message,
    );
    return null;
  }
};

export type BookDisplay = {
  bookName: string;
  bookImg: string;
};

export const GetBooks = async (
  userState: UserState,
): Promise<BookDisplay[] | null> => {
  try {
    console.log('Starting getbooks request');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        req: 'getAllBooks',
        o_u: userState.userData!.o_u!,
        u_c: userState.userData!.o_u!,
        sesskey: userState.userData!.sessionToken!,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      ('Network data gotten!');
    }

    const data = await response.json();

    if (data.status == 'nok') throw new Error(data.error);

    const books: BookDisplay[] = data.allBooks.books.map(
      (book: any, idx: number): BookDisplay => ({
        bookName: book.ownerPrefs.title,
        bookImg: `${IMAGE_URL}${book.ownerPrefs.oCoverImg.replace('/dev', '')}`,
      }),
    );
    //Test for more books than fit on the screen.
    /*books.push(...books);
    books.push(...books);*/
    console.log(books);
    return books;
  } catch (error: any) {
    console.error('There was a problem with the session', error.message);
    return null;
  }
};

export const DoSession = async (
  o_u: string,
  userToken: string,
): Promise<string | null> => {
  try {
    console.log('Starting session request');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        req: 'createSesskey',
        o_u: o_u,
        oauthkey: userToken,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      ('Network data gotten!');
    }

    const data = await response.json();
    console.log(data);

    if (data.status == 'nok') throw new Error(data.error);

    return data.sesskey;
  } catch (error: any) {
    console.error('There was a problem with the session', error.message);
    return null;
  }
};
