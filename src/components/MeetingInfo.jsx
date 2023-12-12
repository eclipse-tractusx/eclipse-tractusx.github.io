import React from 'react';

export default function MeetingInfo({title, schedule, description, contact}) {
    return (
        <section style={meetingInfo}>
            <div style={meetingOverview}>
                <h2 style={meetingTitle}>{title}</h2>
                <div style={meetingSchedule}>{schedule}</div>
            </div>
            <div style={meetingDetails}>
                <p>{description}</p>
                <p>Contact:</p>
                <a href={"mailto:" + contact}>{contact}</a>.
            </div>
        </section>
    );
}

const meetingInfo = {
    display: 'flex',
    width: '100%',
    padding: '1rem 0 0.5rem'
}

const meetingOverview = {
    width: '33%',
    margin: 'auto 0',
    padding: '2rem 0 0.5rem',
    borderRight: '2px solid #faa023'
}

const meetingTitle = {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '25px'
}

const meetingSchedule = {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#a5a5a5'
}

const meetingDetails = {
    width: '67%',
    margin: 'auto 0',
    padding: '0.5rem 1.5rem'
}
