// import React from 'react';
// import { shallow } from 'enzyme';
// import UsersList from '../components/UsersList';
// import axios from 'axios';
// import TestRenderer from 'react-test-renderer';
 
// jest.mock('axios');
 
// describe('UsersList component', () => {
//   describe('when rendered', () => {
//     it('should fetch a list of users', () => {
//       const getSpy = jest.spyOn(axios, 'get');
//       const usersListInstance = shallow(
//         <UsersList/>
//       );
//       expect(getSpy).toBeCalled();
//     });
//   });
// });

import React from 'react';
import {create, act} from 'react-test-renderer';
import Header from '../layouts/Header'; // Testowany komponent

// wyrenderuj komponent
let root; 
act(() => {
  root = create(<Header value={1}/>)
});

// wykonaj sprawdzenia na korzeniu drzewa
expect(root.toJSON()).toMatchSnapshot();

// zaktualizuj komponent przy użyciu innych właściwości
act(() => {
  root.update(<Header value={2}/>);
})

// wykonaj sprawdzenia na korzeniu drzewa
expect(root.toJSON()).toMatchSnapshot();
