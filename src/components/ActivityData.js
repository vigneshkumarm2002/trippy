import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components for the ActivityList
const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 50px;

  @media only screen and (max-width: 1000px) {
    margin-left: 30px;
  }
  @media only screen and (max-width: 520px) {
    margin-left: 0px;
    gap: 15px;
  }
`;

const Activity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
  padding: 0px 20px;

  @media only screen and (max-width: 520px) {
    padding: 0px;
  }
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ActivityTitle = styled.h5`
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;

  @media only screen and (max-width: 1000px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 520px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  padding-right: 30px;
  text-align: justify;

  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 520px) {
    font-size: 14px;
    padding-right: 0px;
  }
`;

const ActivityActionButton = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.span`
  cursor: pointer;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
`;

const EditIcon = styled(Icon)`
  font-size: 18px;
  margin-bottom: 2px;
`;

const DeleteIcon = styled(Icon)`
  font-size: 20px;
  color: red;
`;

const ActivityList = ({ trips, tripId, onDeleteActivity, onEditActivity }) => {

  // Finding currentTrip 
  useEffect(() => {
    const foundTrip = trips.find((trip) => trip.id === tripId);
    setCurrentTrip(foundTrip);
  }, [trips, tripId]);

  // State for currentTrip Selected
  const [currentTrip, setCurrentTrip] = useState(null);

  // Handle deleting an activity
  const handleDeleteActivity = (activityId) => {
    if (onDeleteActivity) {
      onDeleteActivity(tripId, activityId);
    }
  };

  // Handle editing an activity
  const handleEditActivity = (activityId) => {
    if (onEditActivity) {
      onEditActivity(tripId, activityId);
    }
  };

  return (
    <ActivityContainer>
      {currentTrip && currentTrip.activities && currentTrip.activities.length > 0 ? (
        currentTrip.activities.map((activity) => (
          <Activity key={activity.id}>
            <ActivityContent>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityActionButton>
                <EditIcon className="material-symbols-rounded" onClick={() => handleEditActivity(activity.id)}>
                  edit_square
                </EditIcon>
                <DeleteIcon className="material-symbols-rounded" onClick={() => handleDeleteActivity(activity.id)}>
                  delete
                </DeleteIcon>
              </ActivityActionButton>
            </ActivityContent>
            <Description>{activity.description}</Description>
          </Activity>
        ))
      ) : (
        <Description>No activity found</Description>
      )}
    </ActivityContainer>
  );
};

export default ActivityList;
