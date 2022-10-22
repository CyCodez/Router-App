import {useState, useRef} from 'react'
import useFetch from './useFetch'
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import myHome from './home-icon.png'
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" >
      <p className='wrng'>Something went wrong:</p>
      <pre className='wrng'>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button> 
      <p>or go back Home</p>
     <p> <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigates"
        to="/"
      >
       <img src={myHome} width="25" height="25"/>
      </NavLink></p> 
    </div>
  )
}



function Navigation() {
  return (
    
    <section className="navigation">
        <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/Users"
      >
        User
      </NavLink>

 <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/bomb"
      >
        Test_Err
      </NavLink>
      
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigate"
        to="/where"
      >
        404
      </NavLink>
    </section>
  );
}

export const Bomb=()=>{
   const [username, setUsername] = useState('')
  const usernameRef = useRef(null)


function Bomb({username}) {
  if (username === 'bomb') {
    throw new Error('💥 CABOOM 💥')
  }
  return <p>{`Hi ${username}`}</p>
}
  
  return( <div className="cabon">
    <label >
       <p>{`Username (don't type "bomb"): `}</p> 
        <input
          placeholder={`type "bomb"`}
          value={username}
          onChange={e => setUsername(e.target.value)}
          ref={usernameRef}
        />
      </label>
    <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setUsername('')
            usernameRef.current.focus()
          }}
          resetKeys={[username]}
        >
      <Bomb username={username} />
      </ErrorBoundary>
    
  </div>)
}

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p className='welcome'>Welcome to my Home page</p>
    <img src="https://avatars.githubusercontent.com/u/100401054?s=400&u=ec4d2d39a9e6fdca5b677f9237dcc00cd909f589&v=4" alt="profile_photo" width="150px" height="150px"/>
      <p className='welcome'>Click the User button to go to the User page</p>
      <Navigation />
    </div>
  );
}

export function Users() {
  const[color, setColor] = useState(true)
 const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
  
  console.log({ loading, error, data });
  
  const pages = 50;

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">List of Users</h1>
      {data?.results
        .map((each, index) => {
          const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
          return (
            <div className='info' key={name.toLowerCase().replaceAll(' ', '')}>
             <p><img src={each.picture.large}/></p>Name: {`${name}`}
               <p>Date-of-Birth: {each.dob.date.substr(0,10)}</p>
              <p> Country: {each.location.country}</p>
            </div>
          );
        })}
     
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
       {
        <button role="button"
          className="next_btn"
          aria-pressed="false"
          tabindex="0"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
         
        >
          prev
        </button>
      }
      {
        <button className="next_btn"
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
          
        >
          next
        </button>
      }
      
      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button role="button"
          aria-pressed="false"
          tabindex="0" className="user_btn" onClick={() => setPage(each)}>{each}</button>
        )
      )}
      <div className='Navy'><Navigation /></div>
       <Outlet/>
    </div>
  );
}

function Myout() {
  const navigate = useNavigate();
  return (
    <div>
      <p>i am an outlet</p>
      <button onClick={() => navigate("/Users")}>navigate to home</button>
    </div>
  );
}

function Another() {
  return (
    <div>
      <p>i am another outlet</p>
    </div>
  );
}
const Notfound = () => {
  return (
    <div>
      <p className='wrng'>
        error 404 page Not found
      </p>
      <p className='errors'>Return to Home Page</p>
        <NavLink
        style={({ isActive }) =>
          isActive ? { color: "white" } : { color: "black" }
        }
        className="Navigates"
        to="/"
      >
       <img src={myHome} width="25" height="25"/>
      </NavLink>
    </div>
  );
};
function Rout() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/bomb" element={<Bomb/>}/>
      
        <Route path="/Users" element={<Users />}>
            <Route path="out" element={<Myout />} />
          <Route path=":another" element={<Another />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default Rout;




