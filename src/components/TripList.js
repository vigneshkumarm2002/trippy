import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ActivityList from "./ActivityData"
import ActivityForm from "./ActivityForm";

const ViewButton = styled.button`
  outline: none;
  border: none;
  width: fit-content;
  color: black;
  text-align: center;
  font-family: Montserrat;
  font-size:16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  background-color:transparent;
  display:flex;
  gap:5px;
  align-items:center;

  @media only screen and (max-width: 700px) {
    margin-left:-5px;
  }

  @media only screen and (max-width: 520px) {
    font-size:14px;
  }
`;

const CommonTripSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  text-align: center;
  gap:5px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap:20px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 20px 0px 50px 0px;

`;

const TripDataContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  gap: 20px;

  @media only screen and (max-width: 700px) {
    font-size: 16px;

  }
  @media only screen and (max-width: 520px) {
    padding: 20px;
    border-radius: 15px;
    }
`;

const TripData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

`;

const TripHead = styled(CommonTripSection)`
font-size: 20px;
font-weight:600;
background-color: white;
border-radius: 15px;
padding:15px 20px;

@media only screen and (max-width: 1000px) {
  font-size: 16px;
}
@media only screen and (max-width: 700px) {
  padding:0;
  align-items:start;
  }
  @media only screen and (max-width: 520px) {
    font-size: 14px;
    font-weight:500;
    }
`;

const TripValues = styled(CommonTripSection)`
  font-size:20px;
  font-weight:500;
  text-transform: capitalize;

  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 700px) {
    align-items:end;
    }
    @media only screen and (max-width: 520px) {
      font-size: 14px;
      font-weight:600;
      }
 
`;
const SerialNumber = styled.li`
  width: 50px;
  @media only screen and (max-width: 1000px) {
    width: 40px;
  }
  @media only screen and (max-width: 700px) {
    width:fit-content;
    }
`;

const Date = styled.li`
  width: 150px;


  @media only screen and (max-width: 1000px) {
    width: 100px;
  }
  @media only screen and (max-width: 700px) {
    width:fit-content;
    }
`;

const ActionButton = styled.li`
width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;


  @media only screen and (max-width: 1000px) {
    width: 150px;
  }

  @media only screen and (max-width: 700px) {
    width:fit-content;
    }
`;

const Destination = styled.li`
  width: 300px;


  @media only screen and (max-width: 1000px) {
    width: 220px;
  }

  @media only screen and (max-width: 700px) {
    width:fit-content;
    }
`;

const Button = styled.button`  
width: 80px;
outline: none;
border: none;
background-color: #3b3a3a;
height: 40px;
border-radius: 10px;
color: #FFF;
text-align: center;
font-family: Montserrat;
font-size:16px;
font-weight: 500;
cursor: pointer;

@media only screen and (max-width: 1000px) {
  height: 30px;
  border-radius: 8px;
}
`

const Message = styled.p`
font-size:22px;
font-weight:500;
text-align:center;
margin-top:50px;
color:white;

@media only screen and (max-width: 520px) {
  font-size: 18px;
  }
`
const TripDataHead = styled.div`
@media only screen and (max-width: 700px) {
  width:100%;
display:flex;
justify-content:space-between;
gap:20px;
}
`

const Icon = styled.span`
  cursor: pointer;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
`;

const EditIcon = styled(Icon)`
  font-size: 18px;
  margin-bottom: 2px;
`;

const DeleteIcon = styled(Icon)`
  font-size: 20px;
  color: red;
`;

const TripList = ({ trips, editTrip, deleteTrip, setTrips }) => {
  const [showActivity, setShowActivity] = useState({});
  const [editActivityData, setEditActivityData] = useState(null);
  const [isActivityEditing, setIsActivityEditing] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to toggle the visibility of activities for a specific trip
  const toggleActivity = (tripId) => {
    setShowActivity((prevState) => ({
      ...prevState,
      [tripId]: !prevState[tripId],
    }));
  };

  const addActivityToTrip = (tripId, newActivity) => {
    // Add new activity to the trip
    const updatedTripData = trips.map((trip) =>
      trip.id === tripId
        ? {
          ...trip,
          activities: [...(trip.activities || []), newActivity],
        }
        : trip
    );

    setTrips(updatedTripData);
  };

  const onDeleteActivity = (tripId, activityId) => {
    // Delete an activity from the trip
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const updatedActivities = trip.activities.filter(
          (activity) => activity.id !== activityId
        );
        return {
          ...trip,
          activities: updatedActivities,
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const onEditActivity = (tripId, activityId) => {
    // Edit an activity
    const tripToEdit = trips.find((trip) => trip.id === tripId);

    if (tripToEdit) {
      const activityToEdit = tripToEdit.activities.find(
        (activity) => activity.id === activityId
      );

      if (activityToEdit) {
        setEditActivityData(activityToEdit);
        setIsActivityEditing(true);
      }
    }
  };

  const editedActivity = (tripId, newActivityData) => {
    // Update edited activity
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          activities: trip.activities.map((activity) => {
            if (activity.id === editActivityData.id) {
              return {
                ...activity,
                title: newActivityData.title,
                description: newActivityData.description,
              };
            }
            return activity;
          }),
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
    setEditActivityData(null);
    setIsActivityEditing(false);
  };

  return (
    <TableContainer>
      <TripData>
        {screenWidth > 700 && (
          <TripHead>
            <SerialNumber>S.No</SerialNumber>
            <Destination>Destination</Destination>
            <Date>Start Date</Date>
            <Date>End Date</Date>
            <ActionButton>Action</ActionButton>
          </TripHead>
        )}

        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <TripDataContainer key={trip.id}>
              <TripDataHead>
                {screenWidth <= 700 && (
                  <TripHead>
                    <SerialNumber>S.No</SerialNumber>
                    <Destination>Destination</Destination>
                    <Date>Start Date</Date>
                    <Date>End Date</Date>
                    <ActionButton>Action</ActionButton>
                  </TripHead>
                )}
                <TripValues>
                  <SerialNumber>{index + 1}</SerialNumber>
                  <Destination>{trip.destination}</Destination>
                  <Date>{trip.startDate}</Date>
                  <Date>{trip.endDate}</Date>
                  {screenWidth > 520 ? (
                    <ActionButton>
                      <Button onClick={() => editTrip(trip.id)}>Edit</Button>
                      <Button onClick={() => deleteTrip(trip.id)}>Delete</Button>
                    </ActionButton>
                  ) : (
                    <ActionButton>
                      <EditIcon className="material-symbols-rounded" onClick={() => editTrip(trip.id)}>
                        edit_square
                      </EditIcon>
                      <DeleteIcon className="material-symbols-rounded" onClick={() => deleteTrip(trip.id)}>
                        delete
                      </DeleteIcon>
                    </ActionButton>
                  )}
                </TripValues>
              </TripDataHead>
              <ViewButton onClick={() => toggleActivity(trip.id)}>
                {showActivity[trip.id] ? 'Hide Activity' : 'Show Activity'}
                <span className="material-symbols-rounded">
                  {showActivity[trip.id] ? "visibility_off" : "visibility"}
                </span>
              </ViewButton>
              {showActivity[trip.id] && (
                <>
                  <ActivityList
                    trips={trips}
                    tripId={trip.id}
                    onDeleteActivity={onDeleteActivity}
                    onEditActivity={onEditActivity}
                  />
                  <ActivityForm
                    tripId={trip.id}
                    addActivityToTrip={addActivityToTrip}
                    setIsActivityEditing={setIsActivityEditing}
                    isActivityEditing={isActivityEditing}
                    editActivityData={editActivityData}
                    editedActivity={editedActivity}
                  />
                </>
              )}
            </TripDataContainer>
          ))
        ) : (
          <Message>Destination: Unknown<br />No trips planned yet!</Message>
        )}
      </TripData>
    </TableContainer>
  );
};

export default TripList;