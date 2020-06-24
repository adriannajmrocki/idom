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


// import React from 'react';
// import { Provider } from 'react-redux';
// import renderer from 'react-test-renderer';
// import configureStore from 'redux-mock-store';

// import UsersList from '../components/UsersList';
 
// const mockStore = configureStore([]);
 
// describe('My Connected React-Redux Component', () => {
//   let store;
//   let component;
 
//   beforeEach(() => {
//     store = mockStore({
//       users: [
//         {
//           id: 1,
//           username: 'admin',
//           email: 'admin@admin.pl',
//           telephone: '+48538111222',
//           is_active: true,
//           is_staff: true,
//           app_notifications: true,
//           sms_notifications: true
//         },
//       ],
//     });

//     component = renderer.create(
//       <Provider store={store}>
//         <UsersList />
//       </Provider>
//     );
//   });
 
//   it('should render with given state from Redux store', () => {
//     expect(component.toJSON()).toMatchSnapshot();
//   });
// });


// import reducers from '../../reducers';
import reducers from '../reducers';

test('reducers', () => {
  let state;
  state = reducers({users:{users:[{id:6,username:'admin',email:'admin@gmail.com',telephone:'+48123456789',sms_notifications:true,app_notifications:true,is_staff:true,is_active:true},{id:8,username:'test',email:'testedit@gmail.com',telephone:'+48535098765',sms_notifications:false,app_notifications:true,is_staff:false,is_active:true},{id:24,username:'randomuser',email:'adrian.najmrocki@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true},{id:25,username:'nowyuser',email:'nowyuser@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true}]},sensors:{sensors:[{id:3,name:'edytowany1',category:'temperature',frequency:300,last_data:null},{id:8,name:'Pokój 1',category:'temperature',frequency:300,last_data:null},{id:9,name:'czujnik',category:'temperature',frequency:300,last_data:null},{id:11,name:'check2',category:'humidity',frequency:300,last_data:null},{id:13,name:'testowanko1',category:'humidity',frequency:400,last_data:null},{id:24,name:'kolejny1',category:'humidity',frequency:300,last_data:null}],sensorName:'',sensorCategory:''},errors:{msg:{},status:null},messages:{},auth:{token:'26d1f40841ca1618f3c4036b43bc8fbdd4103127',isAuthenticated:true,isLoading:false,user:null},password:{}}, {type:'GET_USERS',payload:[{id:6,username:'admin',email:'admin@gmail.com',telephone:'+48123456789',sms_notifications:true,app_notifications:true,is_staff:true,is_active:true},{id:8,username:'test',email:'testedit@gmail.com',telephone:'+48535098765',sms_notifications:false,app_notifications:true,is_staff:false,is_active:true},{id:24,username:'randomuser',email:'adrian.najmrocki@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true},{id:25,username:'nowyuser',email:'nowyuser@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true}]});
  expect(state).toEqual({users:{users:[{id:6,username:'admin',email:'admin@gmail.com',telephone:'+48123456789',sms_notifications:true,app_notifications:true,is_staff:true,is_active:true},{id:8,username:'test',email:'testedit@gmail.com',telephone:'+48535098765',sms_notifications:false,app_notifications:true,is_staff:false,is_active:true},{id:24,username:'randomuser',email:'adrian.najmrocki@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true},{id:25,username:'nowyuser',email:'nowyuser@gmail.com',telephone:'',sms_notifications:true,app_notifications:true,is_staff:false,is_active:true}]},sensors:{sensors:[{id:3,name:'edytowany1',category:'temperature',frequency:300,last_data:null},{id:8,name:'Pokój 1',category:'temperature',frequency:300,last_data:null},{id:9,name:'czujnik',category:'temperature',frequency:300,last_data:null},{id:11,name:'check2',category:'humidity',frequency:300,last_data:null},{id:13,name:'testowanko1',category:'humidity',frequency:400,last_data:null},{id:24,name:'kolejny1',category:'humidity',frequency:300,last_data:null}],sensorName:'',sensorCategory:''},errors:{msg:{},status:null},messages:{},auth:{token:'26d1f40841ca1618f3c4036b43bc8fbdd4103127',isAuthenticated:true,isLoading:false,user:null},password:{}});
});