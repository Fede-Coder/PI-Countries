import * as data from '../countries.json';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from 'nock';
import nodeFetch from 'node-fetch';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { configure, mount } from 'enzyme';
import axios from 'axios';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import Nav from '../src/components/Nav/Nav';
import Home from '../src/views/Home/Cards'
import Detail from '../src/views/Detail/Detail'

axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

jest.mock('../src/components/Nav/Nav', () => () => (<></>));
jest.mock('../src/views/Landing/Landing', () => () => (<></>));
jest.mock('../src/views/Home/Cards', () => () => (<></>));
jest.mock('../src/views/Activity/Activity', () => () => (<></>));

describe('<App />', () => {
    global.fetch = nodeFetch;

    let store;
    const routes = ['/', '/home', '/activity', '/detail/ARG']
    const mockStore = configureStore([thunk])
    const state = {
        country: {
            isFetching: true,
            countries: data,
            countryDetail: {
                id: "ARG",
                name: "Argentina",
                image: "https://flagcdn.com/ar.svg",
                continent: "Americas",
                capital: "Buenos Aires",
                subregion: "South America",
                area: 2780400,
                population: 45376763
            },
        }
    }

    beforeEach(async () => {
        const apiMock = nock('http://localhost:3001').persist();
        apiMock.get('/countries').reply(200, data);
  
        let id = null;
        apiMock
           .get((uri) => {
              id = (uri.split('/').pop());
              return !!id;
           })
           .reply(200, (uri, requestBody) => {
              return (
               Object.values(data).find((country) => country.id === id) ||
                 {}
              );
           });
        });

     store = mockStore(state);

     const componentToUse = (route) => {
        return (
           <Provider store={store}>
              <MemoryRouter initialEntries={[route]}>
                 <App />
              </MemoryRouter>
           </Provider>
        );
     };

     describe('Nav:', () => {
  
        it('Should be rendered in the path "/home"', () => {
           const app = mount(componentToUse(routes[1]));
           expect(app.find(Nav)).toHaveLength(1);
        });

        it('Should be rendered in the path "/activity"', () => {
           const app = mount(componentToUse(routes[2]));
           expect(app.find(Nav)).toHaveLength(1);
        });
     });

     describe('Detail:', () => {
        it('The path "/detail/:id" should show only the Detail component', () => {
           const app = mount(componentToUse(routes[3]));
           expect(app.find(Home)).toHaveLength(0);
           expect(app.find(Detail)).toHaveLength(1);
        });
     });

});
