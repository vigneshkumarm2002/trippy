import React, { useState } from 'react';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/Header";
import styled from 'styled-components';

// Styled components for improved styling
const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 50px;
  font-weight: 700;
  margin-top: 50px;
  text-align: center;
  color: rgba(21, 21, 21, 0.868);

  @media only screen and (max-width: 700px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 520px) {
    font-size: 30px;
  }
`;

const Underlined = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 8px;
    background-color: #fef250;
    border-radius: 50px;
    transform: skew(-35deg) rotate(-5deg);
  }

  @media only screen and (max-width: 520px) {
    &::after {
      height: 5px;
    }
  }
`;

// Initial trip data
const initialTrips = [
  {
    id: uuidv4(),
    destination: 'Kerala',
    startDate: '2023-11-01',
    endDate: '2023-11-10',
    activities: [
      {
        id: uuidv4(),
        title: 'Backwater Cruise',
        description: 'Take a serene backwater cruise in the beautiful Kerala, known for its picturesque landscapes and tranquil waterways.',
      },
      {
        id: uuidv4(),
        title: 'Explore Munnar',
        description: 'Visit the stunning hill station of Munnar, nestled amidst lush tea plantations and misty mountains in Kerala.',
      },
      {
        id: uuidv4(),
        title: 'Visit Periyar Wildlife Sanctuary',
        description: 'Embark on a wildlife adventure at Periyar Wildlife Sanctuary, home to diverse flora and fauna in Kerala.',
      },
    ],
  },
  {
    id: uuidv4(),
    destination: 'Tamil Nadu',
    startDate: '2023-12-05',
    endDate: '2023-12-15',
    activities: [
      {
        id: uuidv4(),
        title: 'Visit Meenakshi Temple',
        description: 'Explore the magnificent Meenakshi Amman Temple, an architectural marvel in the heart of Madurai, Tamil Nadu.',
      },
      {
        id: uuidv4(),
        title: 'Marina Beach',
        description: 'Relax and enjoy the scenic beauty of Marina Beach, one of the longest urban beaches in the world, located in Chennai, Tamil Nadu.',
      },
      {
        id: uuidv4(),
        title: 'Discover Mahabalipuram',
        description: 'Discover the ancient rock-cut temples and monuments of Mahabalipuram, a UNESCO World Heritage Site in Tamil Nadu.',
      },
    ],
  },
];

function App() {
  // State management for trips and editing
  const [trips, setTrips] = useState(initialTrips);
  const [editTripData, setEditTripData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to add a new trip
  const addTrip = (newTrip) => {
    newTrip.id = uuidv4(); // Generate a unique ID for the new trip
    setTrips([...trips, newTrip]);
  };

  // Function to initiate editing of a trip
  const editTrip = (tripId) => {
    const tripToEdit = trips.find((trip) => trip.id === tripId);
    if (tripToEdit) {
      setEditTripData(tripToEdit);
      setIsEditing(true);
    }
  };

  // Function to save edited trip data
  const editedTrip = (editedData) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === editTripData.id) {
        return {
          ...trip,
          destination: editedData.destination,
          startDate: editedData.startDate,
          endDate: editedData.endDate,
        };
      }
      return trip;
    });

    setTrips(updatedTrips);
    setEditTripData(null);
    setIsEditing(false);
  };

  // Function to delete a trip
  const deleteTrip = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    setTrips(updatedTrips);
    setEditTripData(null);
    setIsEditing(false);
  };

  return (
    <div>
      <Header />
      <Title>
        <Underlined>Explore</Underlined> the world one destination <br /> at a{' '}
        <span style={{ color: '#fef250' }}>time</span>
      </Title>
      {/* Rendering the TripForm and TripList components */}
      <TripForm addTrip={addTrip} editTripData={editTripData} editedTrip={editedTrip} isEditing={isEditing} setIsEditing={setIsEditing} />
      <TripList trips={trips} editTrip={editTrip} deleteTrip={deleteTrip} setTrips={setTrips} />
    </div>
  );
}

export default App;
