import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import NavBar from './NavBar'

const containerStyle = {
  margin: '5% 20% 5% 20%',
}

document.body.style = 'background: #FFF1D7;'

const ForumPage = () => {
  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        {/* ============= CREATE POST FORM ============= */}
        <Form id='create-post-form' className='border p-3 border-info '>
          {/* ===== TITLE ===== */}
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the title of your post'
            />
          </Form.Group>

          {/* ===== CONTENT ===== */}
          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter the content of your post'
            />
          </Form.Group>

          {/* ===== CATEGORY ===== */}
          <Form.Group controlID='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control as='select' defaultValue='Other'>
              <option value='Cooking'>Cooking</option>
              <option value='Space'>Space</option>
              <option value='Art'>Art</option>
              <option value='Educational'>Educational</option>
              <option value='Programming'>Programming</option>
              <option value='Science'>Science</option>
              <option value='Boutonniere'>Boutonniere</option>
              <option value='Fashion'>Fashion</option>
              <option value='Business'>Business</option>
              <option value='Technology'>Technology</option>
              <option value='Health'>Health</option>
              <option value='Music'>Music</option>
              <option value='Gaming'>Gaming</option>
              <option value='Other'>Other</option>
            </Form.Control>
          </Form.Group>

          {/* ===== BUTTON ===== */}
          <Button style={{ marginTop: '1%' }} variant='info' type='submit'>
            Post
          </Button>
        </Form>

        {/* Display all posts */}

        <br></br>
        <br></br>
        <Card bg='secondary' text='light' className='p-2'>
          <Card.Body>
            <Card.Header>This is a header</Card.Header>
            <br></br>
            <Card.Title>Sample content title</Card.Title>
            <Card.Text>
              Content content content Content content content Content content
              content Content content content Content content content Content
              content content Content content content Content content content
              Content content content Content content content
            </Card.Text>
            <br></br>
          </Card.Body>
        </Card>

        <br></br>
        <br></br>
        <Card bg='secondary' text='light' className='p-2'>
          <Card.Body>
            <Card.Header>This is a header</Card.Header>
            <br></br>
            <Card.Title>Sample content title</Card.Title>
            <Card.Text>
              Content content content Content content content Content content
              content Content content content Content content content Content
              content content Content content content Content content content
              Content content content Content content content
            </Card.Text>
            <br></br>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default ForumPage
