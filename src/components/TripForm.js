import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import "./../App.css"

const FormContainer = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
z-index: 1000; /* Ensure it's above other content */
cursor: pointer; /* Change cursor to indicate it's not clickable */

`;




const Form = styled.form`
width: 450px;
height: auto;
padding: 20px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 550px) {
    width: 90%;
    padding: 20px;
  }
`;

const LabelledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 500;

  @media only screen and (max-width: 550px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: #F5F5F5;
  height: 40px;
  border-radius: 10px;
  padding: 0px 10px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
`;

const DateInput=styled.input`
width:100%;
outline: none;
border: none;
background-color: #F5F5F5;
height: 40px;
border-radius: 10px;
padding: 0px 10px;
color: #000;
font-size: 16px;
font-weight: 400;

@media only screen and (max-width: 550px) {
  width:100%;
}
`;

const sharedButtonStyles = `
  outline: none;
  border: none;
  background-color: black;
  height: 50px;
  border-radius: 10px;
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  ${sharedButtonStyles}
  width: 100%;
  @media only screen and (max-width: 550px) {
    font-size: 16px;
    height: 40px;
  }
`;

const AddTripButton = styled.button`
  ${sharedButtonStyles}
  width: 200px;
  margin-top: 0px;

  @media only screen and (max-width: 1000px) {
    width: 150px;
    font-size: 16px;
    height: 40px;
  }

  @media only screen and (max-width: 520px) {
    width: 120px;
    font-size: 14px;
    height: 35px;
    border-radius: 8px;
  }
`;


const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ListText = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  align-items: center;
  gap:10px;

  @media only screen and (max-width: 700px) {
    margin-top: 60px;
  }
`;

const ListTitle = styled.h2`
  color: white;
  font-size: 30px;
  font-weight: 500;
  font-family: Montserrat;


  @media only screen and (max-width: 1000px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 520px) {
    font-size: 18px;
  }
`;

const FlexInput=styled.div`
display: flex;
justify-content: space-between;
@media only screen and (max-width: 550px) {
flex-direction:column;
gap:20px;
}
`

const FormTitle=styled.h2`
font-size:24px;
font-weight:700;

@media only screen and (max-width: 550px) {
  font-size:18px;
  font-weight:700;
}`
const TripForm = ({ addTrip, editTripData, isEditing, editedTrip, setIsEditing }) => {

  // Initial form values
  const initialForm = {
    destination: '',
    startDate: '',
    endDate: '',
  };

  // State to manage form values and form visibility
  const [formValues, setFormValues] = useState(initialForm);
  const [showForm, setShowForm] = useState(isEditing);

  // Effect to update form values when editing is true 
  useEffect(() => {
    setShowForm(isEditing);
    if (isEditing && editTripData) {
      setFormValues({
        destination: editTripData.destination || '',
        startDate: editTripData.startDate || '',
        endDate: editTripData.endDate || '',
      });
    }
  }, [isEditing, editTripData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editedTrip(formValues);
    } else {
      addTrip(formValues);
    }
    setShowForm(false);
    setFormValues(initialForm);
  };

  // Handle click on the form to prevent closing when clicking inside
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  // Handle closing the form
  const handleClose = () => {
    setShowForm(false);
    setIsEditing(false);
    setFormValues(initialForm);
  };

  return (
    <>
      <ListText>
        <ListTitle>List of Trips</ListTitle>
        <AddTripButton onClick={() => setShowForm(true)}>Add New Trip</AddTripButton>
      </ListText>

      {showForm && (
        <FormContainer onClick={handleClose} >
          <Form onClick={handleFormClick} onSubmit={handleSubmit}>
            <FormTitle>{isEditing ? 'Edit Trip' : 'Create a New Trip'}</FormTitle>
            <CloseButton className='material-symbols-rounded' onClick={handleClose}>close</CloseButton>
            <LabelledInput>
              <Label htmlFor="destination">Destination</Label>
              <Input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formValues.destination}
                onChange={handleChange}
                required
              />
            </LabelledInput>
            <FlexInput>
              <LabelledInput>
                <Label htmlFor="startDate">Start Date</Label>
                <DateInput
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  value={formValues.startDate}
                  onChange={handleChange}
                  required
                />
              </LabelledInput>
              <LabelledInput>
                <Label htmlFor="EndDate">End Date</Label>
                <DateInput
                  type="date"
                  name="endDate"
               placeholder="Select Date"
                  value={formValues.endDate}
                  onChange={handleChange}
                  required
                />
              </LabelledInput>
            </FlexInput>
            <SubmitButton type="submit">{isEditing ? 'Save Changes' : 'Add Trip'}</SubmitButton>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default TripForm;
