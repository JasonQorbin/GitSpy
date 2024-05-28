import React from 'react'
import renderer from 'react-test-renderer';
import UserDetailSideBar from "../components/UserDetailSideBar";
import RepoTileHeader from "../components/RepoTileHeader";

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

test("Repo tile header", () => {
    const testData = [
        {
            updated_at : "2023-12-04T20:43:40Z",
            created_at : "2021-12-04T20:43:40Z",
            id: 11223344,
            html_url: "testHTMLurl",
            name: "testName",
            description: "Some test description",
            language: "Haskell",
        }
    ];

    const updatedAt = new Date(testData.updated_at);
    const createdAt = new Date(testData.created_at);
    const tree = renderer
        .create(<RepoTileHeader repo={testData} updatedAt={updatedAt} createdAt={createdAt}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
})
