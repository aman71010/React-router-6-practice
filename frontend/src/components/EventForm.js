import { json, redirect, useNavigate, Form, useActionData } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  const data = useActionData();

  let errors = [];
  if(data && data.errors) {
    errors = Object.keys(data.errors);
  }

  return (
    <>
      { 
        <ul style={{textAlign: 'center', color: 'red'}}>
          {errors.map(err => <li key={err}>{data.errors[err]}</li>)}
        </ul>
      }
      <Form method={method} className={classes.form} >
        <p>
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type="text" 
            name="title" 
            required 
            defaultValue={event && event.title}/>
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input 
            id="image" 
            type="url" 
            name="image" 
            required 
            defaultValue={event && event.image}/>
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input 
            id="date" 
            type="date" 
            name="date" 
            required 
            defaultValue={event && event.date}/>
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            rows="5" 
            required 
            defaultValue={event && event.description}/>
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default EventForm;

export async function action({request, params}) {
  const data = await request.formData();
  
  const eventData = {
    title: data.get('title'),
    description: data.get('description'),
    image: data.get('image'),
    date: data.get('date'),
  }

  const method = request.method;
  let url = "http://localhost:8080/events";

  if(method === 'PATCH') {
    const id = params.eventId;
    url = "http://localhost:8080/events/" + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData),
  });

  if(response.status === 422) {
    console.log(422);
    return response;
  }

  if(!response.ok) {
    throw json({message: "Could not save event."}, {status: 500});
  } 

  return redirect('/events');
}
