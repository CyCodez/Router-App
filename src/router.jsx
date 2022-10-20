import {useState, useRef} from 'react'
import useFetch from './useFetch'
import {
  NavLink,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import myHome from './home-icon.png'
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" style={{lineHeight:"40px"}}>
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{error.message}</pre>
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
  return `Hi ${username}`
}
  
  return( <div>
    <label>
        {`Username (don't type "bomb"): `}
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
      <p>This is my Home page</p>
    <img src="https://avatars.githubusercontent.com/u/100401054?s=400&u=ec4d2d39a9e6fdca5b677f9237dcc00cd909f589&v=4" alt="profile_photo" width="150px" height="150px"/>
      <p style={{margin:"15px"}}>Click the User button to go to the User page</p>
      <Navigation />
    </div>
  );
}

export function Users() {
 const [page, setPage] = useState(1);
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  );
  // const { loading, error, data } = useFetch(
  //   `https://randomuser.me/api/?results=1000&seed=abc`
  // );

  console.log({ loading, error, data });

  // step1
  const PER_PAGE = 5;
  // step2
  const total = data?.results?.length;
  // step3
  const pages = 50;
  // let page = 1
  // Magic of pagination
  // 1 * 10 - 10 = 0
  // 2 * 10 - 10 = 10
  // 3 * 10 - 10 = 20
  // 1 * 5 - 5 = 0
  // 2 * 5 - 5 = 5
  // 3 * 5 - 5 = 10
  const skip = page * PER_PAGE - PER_PAGE;
  // console.log(skip, total);

  // use the useEffect to make api call based on the page.

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">List of Users</h1>
      {/* TODO: another magic with Array.slice() */}
      {/* slice(0, 10) */}
      {/* slice(10, 20) */}
      {/* slice(20, 30) */}

      {/* 0, 0 + 5 slice(0, 5)*/}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {/* 0, 1*10 */}
      {/* 10, 20 */}
      {/* 20, 30 */}

      {data?.results
        // .slice(skip, skip + PER_PAGE)
        // .slice((page - 1) * PER_PAGE, page * PER_PAGE)
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
         style={{background:"orange",color:"black"}}
        >
          prev
        </button>
      }
      {
        <button className="next_btn"
          disabled={page >= pages}
          aria-disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
          style={{backgroundColor:"orange",color:"black"}}
        >
          next
        </button>
      }
      
      
      {/* another magic here */}
      {Array.from({ length: pages }, (value, index) => index + 1).map(
        (each) => (
          <button role="button"
          aria-pressed="false"
          tabindex="0" className="user_btn" onClick={() => setPage(each)}>{each}</button>
        )
      )}
      <div style={{margin:"15px"}}><Navigation /></div>
       <Outlet/>
    </div>
  );
}

function Myout() {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  return (
    <div>
      <p>i am an outlet</p>
      <button onClick={() => navigate("/about")}>navigate to home</button>
    </div>
  );
}

function Another() {
  return (
    <div>
      <p>i am another one</p>
    </div>
  );
}
const Notfound = () => {
  return (
    <div>
      <p style={{ color: "red", fontSize: "20px" }}>
        {" "}
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




