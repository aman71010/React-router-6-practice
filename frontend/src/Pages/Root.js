import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function Root() {
  //const navigation = useNavigation();
  
  return (
    <div>
      <MainNavigation />
      <main>
        <Outlet />
        {/* {navigation.state === 'loading' && <p style={{textAlign: 'center'}}>Loading...</p>} */}
      </main>
    </div>
  )
}

export default Root;