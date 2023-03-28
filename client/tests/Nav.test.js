import { configure, shallow } from "enzyme";

import Adapter from "@cfaester/enzyme-adapter-react-18";
import Nav from "../src/components/Nav/Nav";
import React from "react";
import isReact from "is-react";
import { NavALink } from '../src/components/Nav/StyledNav'

configure({ adapter: new Adapter() });


describe("<Nav />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<Nav />);
    expect(isReact.classComponent(Nav)).toBeFalsy();
  });
  
  it('Debería renderizar dos <NavLink to="" />. El primero que vaya a "/home" y el segundo a "/activities"', () => {
    expect(nav.find(NavALink).length).toBeGreaterThanOrEqual(2);
    expect(nav.find(NavALink).find({to:"/home"}).length).toBe(1)
    expect(nav.find(NavALink).find({to:"/activity"}).length).toBe(1)
  });

});
