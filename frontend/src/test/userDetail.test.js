import React from 'react'
import renderer from 'react-test-renderer';
import UserDetailSideBar from "../components/UserDetailSideBar";

test('Full User detail side bar', () => {
    const tree = renderer
        .create(
            <UserDetailSideBar
                profilePic="testImageURL"
                fullName="testFullName"
                username="testUsername"
                location="testLocation"
                email="testEmail"
                twitter="testEmail"
                userURL="testUserURL"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('User detail side bar without email, location or twitter', () => {
    const tree = renderer
        .create(
            <UserDetailSideBar
                profilePic="testImageURL"
                fullName="testFullName"
                username="testUsername"
                userURL="testUserURL"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
})
