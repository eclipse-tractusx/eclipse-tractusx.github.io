/*********************************************************************************
 * Copyright (c) 2023,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import { useColorMode } from '@docusaurus/theme-common';
import { meetings } from '@site/data/meetings';
import { generateCalendarEvents, getCategoryStyle, formatDateInTimezone, formatTimeRange } from '@site/src/utils/meetingUtils';
import './MeetingCalendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Common timezones
const TIMEZONES = [
  { value: 'Europe/Berlin', label: '(CET/CEST) Berlin / Madrid / Paris' },
  { value: 'Europe/Bucharest', label: '(EET/EEST) Eastern Europe' },
  { value: 'Africa/Johannesburg', label: '(SAST) South Africa' },
  { value: 'UTC', label: '(UTC/GMT) London / Lisbon' },
  { value: 'America/New_York', label: '(EST/EDT) New York / Toronto' },
  { value: 'America/Los_Angeles', label: '(PST/PDT) Los Angeles / Vancouver' },
  { value: 'America/Mexico_City', label: '(CST/CDT) Mexico City' },
  { value: 'America/Sao_Paulo', label: '(BRT/BRST) São Paulo' },
  { value: 'America/Argentina/Buenos_Aires', label: '(ART) Buenos Aires' },
  { value: 'Asia/Kolkata', label: '(IST) India' },
  { value: 'Asia/Tokyo', label: '(JST) Tokyo' },
  { value: 'Asia/Seoul', label: '(KST) Seoul' },
  { value: 'Asia/Shanghai', label: '(CST) Shanghai' },
];

const LEGEND_ITEMS = [
  { color: '#4a90e2', label: 'General Office Hours' },
  { color: '#50c878', label: 'Product Meetings' },
  { color: '#f5a623', label: 'One-time Meetings' },
];

export default function MeetingCalendar({ onTimezoneChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedTimezone, setSelectedTimezone] = useState('Europe/Berlin');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarContainerRef = useRef(null);
  const [fixedWidth, setFixedWidth] = useState(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Capture initial width and lock it
  useEffect(() => {
    if (calendarContainerRef.current && !fixedWidth) {
      const width = calendarContainerRef.current.offsetWidth;
      setFixedWidth(width);
    }
  }, [fixedWidth]);

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
    
    // Dispatch custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timezoneChange', { detail: { timezone } }));
    }
    
    if (onTimezoneChange) {
      onTimezoneChange(timezone);
    }
  };

  // Generate events for the current view
  const events = useMemo(() => {
    const start = startOfMonth(subMonths(currentDate, 1));
    const end = endOfMonth(addMonths(currentDate, 2));
    return generateCalendarEvents(meetings, start, end, selectedTimezone);
  }, [currentDate, selectedTimezone]);

  const eventStyleGetter = (event) => {
    return {
      style: getCategoryStyle(event.category),
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Box className="meeting-calendar-container" ref={calendarContainerRef}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <FormControl size="small" sx={{ minWidth: 280 }}>
          <InputLabel id="timezone-select-label">Timezone</InputLabel>
          <Select
            labelId="timezone-select-label"
            id="timezone-select"
            value={selectedTimezone}
            label="Timezone"
            onChange={(e) => handleTimezoneChange(e.target.value)}
            sx={{
              bgcolor: isDark ? '#1b1b1d' : '#fff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#444' : '#ccc',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#faa023',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#faa023',
              },
              color: isDark ? '#fff' : 'inherit',
            }}
          >
            {TIMEZONES.map((tz) => (
              <MenuItem key={tz.value} value={tz.value}>
                {tz.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {LEGEND_ITEMS.map((item) => (
            <Stack key={item.label} direction="row" spacing={0.75} alignItems="center">
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '3px',
                  bgcolor: item.color,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Box sx={{ width: fixedWidth ? `${fixedWidth}px` : '100%', maxWidth: '100%', overflow: 'hidden', margin: '0 auto' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: '100%' }}
          view={view}
          onView={setView}
          date={currentDate}
          onNavigate={setCurrentDate}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          popup
          views={['month', 'week', 'day']}
        />
      </Box>

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            bgcolor: isDark ? '#1b1b1d' : '#fff',
            color: isDark ? '#fff' : 'inherit',
          },
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ pr: 6, color: isDark ? '#fff' : '#333' }}>
              {selectedEvent.title}
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: isDark ? '#ccc' : '#666',
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ color: isDark ? '#ccc' : '#666' }}>
              <Typography variant="body1" sx={{ mb: 1, color: isDark ? '#fff' : '#333' }}>
                <strong>Time:</strong>{' '}
                {formatTimeRange(
                  selectedEvent.utcStart || selectedEvent.start,
                  selectedEvent.utcEnd || selectedEvent.end,
                  selectedTimezone,
                )}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: isDark ? '#fff' : '#333' }}>
                <strong>Date:</strong>{' '}
                {formatDateInTimezone(
                  selectedEvent.utcStart || selectedEvent.start,
                  selectedTimezone,
                  'EEEE, MMMM d, yyyy',
                )}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Description:</strong> {selectedEvent.description}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Contact:</strong>{' '}
                <Link href={`mailto:${selectedEvent.contact}`} sx={{ color: '#faa023' }}>
                  {selectedEvent.contact}
                </Link>
              </Typography>
              {selectedEvent.sessionLink && (
                <Button
                  variant="contained"
                  fullWidth
                  href={selectedEvent.sessionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: '#faa023',
                    color: '#fff',
                    borderRadius: '5px',
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '14px',
                    textTransform: 'none',
                    mt: 1,
                    py: 0.8,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#1e1e1e', color: '#faa023', boxShadow: 'none' },
                  }}
                >
                  Join Meeting
                </Button>
              )}
              {selectedEvent.additionalLinks && selectedEvent.additionalLinks.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Additional Links:
                  </Typography>
                  <List dense disablePadding>
                    {selectedEvent.additionalLinks.map((link, index) => (
                      <ListItem key={index} disableGutters disablePadding sx={{ mb: 0.25 }}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: '#faa023', '&:hover': { textDecoration: 'underline' } }}
                        >
                          {link.title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} sx={{ color: isDark ? '#ccc' : '#666' }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
