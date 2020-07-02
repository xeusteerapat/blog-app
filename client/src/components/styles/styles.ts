import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

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

export const Button = styled(Link)`
  display: inline-block;
  border-radius: 3px;
  padding: 1rem;
  margin: 0.5rem 1rem;
  width: 11rem;
  font-weight: bold;
  font-size: 1.25rem;
  align-items: center;
  background-color: coral;
  color: white;
  border: 2px solid white;
  cursor: pointer;
  text-decoration: none;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  background-color: #ffa45c;
  cursor: pointer;
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  color: white;
  flex-grow: 1;

  a {
    text-decoration: none;
    color: white;
  }

  a:visited {
    color: white;
  }
`;

// Form
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  align-items: center;
  margin-top: 1rem;
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  align-items: center;

  h2 {
    text-align: center;
  }
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

export const StyledInputWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const ValidateError = styled.small`
  color: red;
`;

export const StyledButton = styled.button`
  display: block;
  background-color: coral;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 3px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const ErrorBox = styled.div`
  display: block;
  position: relative;
  text-align: center;
  max-width: 660px;
  padding: 20px;
  background-color: #f44336;
  color: white;
  margin-bottom: 1rem;
  margin: 0 auto;
  border-radius: 5px;
`;

export const Content = styled.p`
  font-size: 1.3rem;
`;
