import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './../App.css';
import { v4 as uuidv4 } from 'uuid';

// Styled components for the form and its elements
const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  cursor: pointer;
`;

const Form = styled.form`
  width: 90%;
  max-width: 450px;
  height: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LabelledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  @media only screen and (max-width: 550px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: #f5f5f5;
  height: 40px;
  border-radius: 10px;
  padding: 0px 10px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
`;

const sharedButtonStyles = `
  outline: none;
  border: none;
  background-color: #3b3a3a;
  height: 40px;
  border-radius: 10px;
  width: 100%;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  ${sharedButtonStyles}
`;

const AddActivityButton = styled.button`
  ${sharedButtonStyles}
  width: 150px;

  @media only screen and (max-width: 1000px) {
    width: 120px;
    font-size: 14px;
    height: 35px;
  }

  @media only screen and (max-width: 520px) {
    width: 100px;
    font-size: 12px;
    height: 30px;
    border-radius: 8px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;

  @media only screen and (max-width: 550px) {
    font-size: 18px;
    font-weight: 700;
  }
`;

const ActivityForm = ({
  tripId,
  addActivityToTrip,
  isActivityEditing,
  setIsActivityEditing,
  editActivityData,
  editedActivity,
}) => {

    // Initial form values
  const initialForm = {
    title: '',
    description: '',
  };

 
  // State variables for form values and form visibility
  const [activityFormValues, setActivityFormValues] = useState(initialForm);
  const [showActivityForm, setShowActivityForm] = useState(isActivityEditing);

   // Effect to update form values when editing is true 
  useEffect(() => {
    setShowActivityForm(isActivityEditing);
    if (isActivityEditing && editActivityData) {
      setActivityFormValues({
        title: editActivityData.title || '',
        description: editActivityData.description || '',
      });
    }
  }, [isActivityEditing, editActivityData]);

  // Handle changes in form input fields
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivityFormValues({ ...activityFormValues, [name]: value });
  };

  // Handle form submission
  const handleActivitySubmit = (e) => {
    e.preventDefault();

    if (isActivityEditing) {
      editedActivity(tripId, activityFormValues);
    } else {
      const newActivity = {
        id: uuidv4(),
        title: activityFormValues.title,
        description: activityFormValues.description,
      };

      addActivityToTrip(tripId, newActivity);
    }

    // Close the form and reset form values
    setShowActivityForm(false);
    setActivityFormValues(initialForm);
  };

  // Handle click on the form to prevent closing when clicking inside
  const handleActivityFormClick = (e) => {
    e.stopPropagation();
  };

  // Handle closing the form
  const handleActivityClose = () => {
    setShowActivityForm(false);
    setIsActivityEditing(false);
    setActivityFormValues(initialForm);
  };

  return (
    <>
      <AddActivityButton onClick={() => setShowActivityForm(true)}>Add Activity</AddActivityButton>
      {showActivityForm && (
        <FormContainer onClick={handleActivityClose}>
          <Form onClick={handleActivityFormClick} onSubmit={handleActivitySubmit}>
            <FormTitle>{isActivityEditing ? 'Edit Activity' : 'Add Activity'}</FormTitle>
            <CloseButton className="material-symbols-rounded" onClick={handleActivityClose}>
              close
            </CloseButton>
            <LabelledInput>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={activityFormValues.title}
                onChange={handleActivityChange}
                required
              />
            </LabelledInput>
            <LabelledInput>
              <Label htmlFor="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Description"
                value={activityFormValues.description}
                onChange={handleActivityChange}
                required
              />
            </LabelledInput>
            <SubmitButton type="submit">
              {isActivityEditing ? 'Save Changes' : 'Add Activity'}
            </SubmitButton>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ActivityForm;
