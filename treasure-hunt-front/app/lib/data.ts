import {
  Clue
} from './definitions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:8080/";

export async function getClues() {
    try {
      const response = await fetch(`${BASE_URL}` + `api/clues/`, {
        credentials: 'include'
      });
    
      const result = await response.json();
      
      const clues: Clue[] = result.map((clueData: any) => ({
        text: clueData.text,
        image: clueData.image,
      }));
      return clues;
    } catch (error) {
      console.error("Error fetching clues:", error);
    }
}

export async function getNotes() {
    try {
      const response = await fetch(`${BASE_URL}` + `users/notes`, {
        credentials: 'include'
      });
    
      const result = await response.text();
      
      return result;
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
}

export async function login(username: string, password: string) {  
  const data = {
      username,
      password
  };

  try {
      const response = await fetch(`${BASE_URL}` + 'auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      });
      
      if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData);
          throw new Error(errorData.message || 'Login fejl');
      }

      const result = await response.json();

      if (result === true) {
          localStorage.setItem('username', username);
          toast.success('Du er nu logget ind som: ' + username);
          window.location.href = '/clues';
      } else {
          toast.error('Fejl ved login')
      }

  } catch (error) {
      toast.error('Der opstod en fejl under login');
      throw error;  
  }
}

export async function signup(name: string, email: string, phone: string, username: string, password: string) {  

  const data = {
      email,
      phone,
      name,
      username,
      password
  };

  try {
      const response = await fetch(`${BASE_URL}` + 'users/new-user', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        
        console.error(errorData);

        throw new Error(errorData.message || 'Fejl ved oprettelse af bruger');
    }

      const result = await response.json();

      if (result.username) {
          toast.success('Velkommen til ' + username);
          window.location.href = '/login';
      } else {
          toast.error('Fejl ved oprettelse af bruger')
      }

  } catch (error) {
      toast.error('Der opstod en fejl under oprettelse af brugeren');
      throw error;  
  }
}

export async function logout() {  
    try {
        const response = await fetch(`${BASE_URL}` + 'auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          
          console.error(errorData);
  
          throw new Error(errorData.message || 'Fejl ved logout');
        }
  
        const result = await response.json();
  
        if (result != null) {
            toast.success('Du er nu logget ud');
            localStorage.removeItem('username');
            window.location.href = '/login';
        } else {
            toast.error('Fejl ved logout')
        }
  
    } catch (error) {
        toast.error('Der opstod en fejl under oprettelse af brugeren');
        throw error;  
    }
}

export async function unlockCode(name: string, code: string) {  

    const data = {
        name, 
        password: code
    };
  
    try {
        const response = await fetch(`${BASE_URL}` + 'api/codes/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          
          console.error(errorData);
  
          throw new Error(errorData.message || 'Der opstod en fejl');
      }
  
        const result = await response.json();
  
        if (result === true) {
            toast.success('Godt klaret!');
            return true;
        } else {
            toast.error('Ikke helt rigtigt..');
            return false;
        }
  
    } catch (error) {
        toast.error('Der opstod en fejl');
        throw error;  
    }
}

export async function updateNotes(notes: string) {

    try {
        const response = await fetch(`${BASE_URL}` + 'users/notes', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: notes
        });

        if (!response.ok) {
            const errorData = await response.json();
            
            console.error(errorData);
    
            throw new Error(errorData.message || 'Der opstod en fejl');
        }
        
        toast.success('Dine noter blev gemt!');
        

    } catch (error) {
        console.error(error);
    }
}




