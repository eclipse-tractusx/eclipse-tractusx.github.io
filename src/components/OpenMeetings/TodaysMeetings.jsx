/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
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

import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HistoryIcon from '@mui/icons-material/History';
import { useColorMode } from '@docusaurus/theme-common';
import { meetings } from '@site/data/meetings';
import { generateCalendarEvents } from '@site/src/utils/meetingUtils';
import { startOfDay, endOfDay } from 'date-fns';

function MeetingItem({ event, isLive, isPast }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        p: { xs: '0.6rem 0.75rem', sm: '0.75rem 1rem' },
        borderRadius: '14px',
        borderColor: isLive
          ? '#22c55e'
          : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
        background: isLive
          ? (isDark ? 'linear-gradient(135deg, #0a2e1a 0%, #052e16 100%)' : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)')
          : (isDark ? '#1e2127' : '#fff'),
        opacity: isPast ? 0.45 : 1,
        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '@media (hover: hover)': {
          '&:hover': {
            borderColor: 'rgba(250, 160, 35, 0.25)',
            boxShadow: '0 2px 12px rgba(250, 160, 35, 0.1)',
            transform: 'translateX(2px)',
          },
        },
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: '0.82rem',
          fontWeight: 600,
          color: isDark ? '#d1d5db' : '#374151',
          whiteSpace: 'nowrap',
          minWidth: 110,
          bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb',
          p: '0.3rem 0.6rem',
          borderRadius: '8px',
        }}
      >
        <span>{formatTime(event.start)}</span>
        <Box component="span" sx={{ color: '#9ca3af' }}>–</Box>
        <span>{formatTime(event.end)}</span>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.82rem', sm: '0.88rem' },
            color: isDark ? '#f3f4f6' : '#1a1a2e',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            wordBreak: 'break-word',
          }}
        >
          {event.title}
        </Typography>
        {isLive && (
          <Chip
            icon={<FiberManualRecordIcon sx={{ fontSize: '12px !important' }} />}
            label="LIVE"
            size="small"
            sx={{
              bgcolor: '#22c55e',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.65rem',
              height: 22,
              letterSpacing: '0.04em',
              animation: 'pulse-live 2s infinite',
              '@keyframes pulse-live': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 },
              },
              '& .MuiChip-icon': { color: '#fff' },
            }}
          />
        )}
      </Box>

      {event.sessionLink && (
        <Button
          variant="contained"
          size="small"
          href={event.sessionLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            bgcolor: '#faa023',
            color: '#fff',
            borderRadius: '5px',
            fontFamily: '"Manrope", sans-serif',
            fontSize: { xs: '12px', sm: '14px' },
            fontWeight: 600,
            textTransform: 'none',
            px: { xs: 2, sm: 3 },
            py: 0.5,
            whiteSpace: 'nowrap',
            boxShadow: 'none',
            width: { xs: '100%', sm: 'auto' },
            minHeight: 40,
            '&:hover': {
              bgcolor: '#1e1e1e',
              color: '#faa023',
              boxShadow: 'none',
            },
          }}
        >
          Join Meeting
        </Button>
      )}
    </Paper>
  );
}

export default function TodaysMeetings({ timezone = 'Europe/Berlin' }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const todayEvents = useMemo(() => {
    const now = new Date();
    const start = startOfDay(now);
    const end = endOfDay(now);
    const events = generateCalendarEvents(meetings, start, end, timezone);
    return events.sort((a, b) => a.start - b.start);
  }, [timezone]);

  if (todayEvents.length === 0) {
    return null;
  }

  const now = new Date();

  const upcomingEvents = todayEvents.filter(e => now <= e.end);
  const passedEvents = todayEvents.filter(e => now > e.end);

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #fffcf5 0%, #fff8eb 100%)',
        border: '1px solid',
        borderColor: 'rgba(250, 160, 35, 0.2)',
        borderRadius: '20px',
        p: { xs: '1rem', sm: '1.5rem 2rem' },
        mb: 3,
        boxShadow: isDark
          ? '0 1px 3px rgba(0, 0, 0, 0.2)'
          : '0 1px 3px rgba(250, 160, 35, 0.06)',
      }}
    >
      <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center" sx={{ mb: 2 }}>
        <Avatar
          sx={{
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            background: 'linear-gradient(135deg, #faa023 0%, #f59e0b 100%)',
            borderRadius: '14px',
            boxShadow: '0 2px 8px rgba(250, 160, 35, 0.2)',
          }}
          variant="rounded"
        >
          <CalendarTodayIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: '#fff' }} />
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.15rem',
              fontWeight: 700,
              m: 0,
              color: isDark ? '#f3f4f6' : '#1a1a2e',
              letterSpacing: '-0.01em',
            }}
          >
            Today&apos;s Meetings
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.82rem', color: isDark ? '#9ca3af' : '#6b7280', mt: 0.25 }}
          >
            {todayEvents.length} meeting{todayEvents.length !== 1 ? 's' : ''} scheduled for today
          </Typography>
        </Box>
      </Stack>

      {upcomingEvents.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1, pl: 0.5 }}>
            <ScheduleIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
            <Typography
              variant="overline"
              sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.08em' }}
            >
              Upcoming
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {upcomingEvents.map((event, index) => {
              const isLive = now >= event.start && now <= event.end;
              return (
                <MeetingItem
                  key={`upcoming-${event.id}-${index}`}
                  event={event}
                  isLive={isLive}
                  isPast={false}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {passedEvents.length > 0 && (
        <Box>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1, pl: 0.5 }}>
            <HistoryIcon sx={{ fontSize: 16, color: isDark ? '#6b7280' : '#9ca3af' }} />
            <Typography
              variant="overline"
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: isDark ? '#6b7280' : '#9ca3af',
                letterSpacing: '0.08em',
              }}
            >
              Passed
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {passedEvents.map((event, index) => (
              <MeetingItem
                key={`passed-${event.id}-${index}`}
                event={event}
                isLive={false}
                isPast={true}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Paper>
  );
}
