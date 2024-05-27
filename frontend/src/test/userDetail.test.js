import React from 'react'
import renderer from 'react-test-renderer';
import UserDetailSideBar from "../components/UserDetailSideBar";
import RepoTiles from "../components/RepoTiles";

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

test("Repo tiles", () => {
    const testData = [
        {
            updated_at : "2023-12-04T20:43:40Z",
            id: 11223344,
            html_url: "testHTMLurl",
            name: "testName",
            description: "Some test description",
            language: "Haskell",
        },
        {
            updated_at : "2023-09-24T20:32:40Z",
            id: 66992288,
            html_url: "testHTMLurl2",
            name: "testName2",
            description: "Some other test description",
            language: "Pascal",
        },
        {
            updated_at : "2021-03-04T16:10:40Z",
            id: 12454512,
            html_url: "testHTMLurl3",
            name: "testName3",
            description: "Yet another test description",
            language: "Ruby",
        }
    ];
    const tree = renderer
        .create(<RepoTiles repositories={testData} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
})
