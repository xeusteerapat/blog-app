import styled from 'styled-components';

export const PageContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  max-width: 1100px;
  margin: auto;
  padding: 0 2rem;
  box-sizing: border-box;
`;

export const Navbar = styled.nav`
  ul {
    list-style: none;
  }

  ul li {
    color: #333;
    display: inline-block;
    padding: 1rem;
    position: relative;
  }

  ul li a {
    color: #333;
    text-decoration: none;
  }

  /* Hide nested ul by default */
  ul li ul {
    display: none;
  }

  ul li:hover {
    cursor: pointer;
    background: coral;
    color: #fff;
  }

  ul li:hover a {
    color: #fff;
  }

  /* Display dropdown menu */
  ul li:hover ul {
    display: block;
    position: absolute;
    left: -40px;
    width: 200px;
    margin-top: 1rem;
  }

  ul li:hover ul li {
    display: block;
    background: #e7e7e7;
  }

  ul li:hover ul li a {
    color: #333;
  }
  ul li:hover ul li::hover {
    background: #e0e0e0;
    color: inherit;
  }
`;

export const Showcase = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }
`;
