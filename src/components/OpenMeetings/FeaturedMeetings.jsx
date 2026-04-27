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

import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useColorMode } from '@docusaurus/theme-common';
import { meetings, MEETING_CATEGORIES } from '@site/data/meetings';
import { getScheduleDescription, getCategoryColor } from '@site/src/utils/meetingUtils';

const CATEGORY_LABELS = {
  [MEETING_CATEGORIES.GENERAL]: 'General',
  [MEETING_CATEGORIES.PRODUCT]: 'Product',
  [MEETING_CATEGORIES.ONE_TIME]: 'Event',
};

function FeaturedCard({ meeting, timezone, isHero }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const categoryColor = getCategoryColor(meeting.category);
  const categoryLabel = CATEGORY_LABELS[meeting.category] || meeting.category;

  return (
    <Card
      id={meeting.title}
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        borderRadius: '20px',
        overflow: 'hidden',
        bgcolor: isDark ? '#1e2127' : '#fff',
        boxShadow: isDark
          ? '0 1px 3px rgba(0,0,0,0.2), 0 6px 24px rgba(0,0,0,0.2)'
          : '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s, border-color 0.3s',
        display: isHero ? 'grid' : 'flex',
        flexDirection: isHero ? undefined : 'column',
        gridTemplateColumns: isHero ? { xs: '1fr', md: '1fr 1.2fr' } : undefined,
        gridColumn: isHero ? '1 / -1' : undefined,
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(250,160,35,0.2)',
            boxShadow: isDark
              ? '0 12px 40px rgba(250,160,35,0.15), 0 4px 12px rgba(0,0,0,0.2)'
              : '0 12px 40px rgba(250,160,35,0.12), 0 4px 12px rgba(0,0,0,0.06)',
          },
          '&:hover img': { transform: 'scale(1.06)' },
        },
        '&:hover .hash-link': { opacity: 1 },
      }}
    >
      {meeting.image && (
        <CardMedia
          component="img"
          image={meeting.image}
          alt={meeting.title}
          loading="lazy"
          sx={{
            minHeight: isHero ? { xs: 180, md: 280 } : { xs: 140, md: 180 },
            objectFit: 'cover',
            background: 'linear-gradient(135deg, #faa023 0%, #ff8c42 100%)',
            transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
      )}

      {meeting.image && (
        <Chip
          label={categoryLabel}
          size="small"
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            bgcolor: categoryColor,
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        />
      )}

      <CardContent
        sx={{
          p: isHero ? { xs: '1.5rem', md: '2rem 2.5rem' } : '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          '&:last-child': { pb: isHero ? { xs: '1.5rem', md: '2rem' } : '1.5rem' },
        }}
      >
        {!meeting.image && (
          <Chip
            label={categoryLabel}
            size="small"
            sx={{
              bgcolor: categoryColor,
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              width: 'fit-content',
              mb: 1,
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          />
        )}

        <Typography
          variant="h6"
          sx={{
            fontSize: isHero ? { xs: '1.2rem', md: '1.5rem' } : { xs: '1rem', md: '1.15rem' },
            fontWeight: 700,
            mb: 0.5,
            lineHeight: 1.3,
            color: isDark ? '#f3f4f6' : '#1a1a2e',
            letterSpacing: '-0.01em',
            wordBreak: 'break-word',
          }}
        >
          {meeting.title}
          <a className="hash-link" href={`#${meeting.title}`} title="Direct link to meeting"
            style={{ opacity: 0, transition: 'opacity 0.2s' }}>{' '}</a>
        </Typography>

        <BrowserOnly fallback={<Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>Loading schedule...</Typography>}>
          {() => (
            <Typography variant="body2" sx={{ fontSize: '0.82rem', color: isDark ? '#9ca3af' : '#6b7280', mb: 1 }}>
              {meeting.recurrence
                ? getScheduleDescription(meeting, timezone)
                : 'No dedicated schedule — session needs to be requested'}
            </Typography>
          )}
        </BrowserOnly>

        <Typography
          variant="body2"
          sx={{
            fontSize: isHero ? { xs: '0.88rem', md: '0.95rem' } : '0.88rem',
            color: isDark ? '#d1d5db' : '#4b5563',
            lineHeight: 1.65,
            mb: 2,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {meeting.description}
        </Typography>

        <Stack spacing={1} sx={{ mt: 'auto', width: '100%' }}>
          {meeting.sessionLink && (
            <Button
              variant="contained"
              fullWidth
              href={meeting.sessionLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: '#faa023',
                color: '#fff',
                borderRadius: '5px',
                fontFamily: '"Manrope", sans-serif',
                fontSize: isHero ? '16px' : '14px',
                fontWeight: 600,
                textTransform: 'none',
                py: isHero ? 1.2 : 0.8,
                boxShadow: 'none',
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
          <Button
            variant="outlined"
            fullWidth
            href={`#${meeting.title}`}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              borderRadius: '5px',
              fontFamily: '"Manrope", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none',
              py: 0.8,
              color: isDark ? '#9ca3af' : '#6b7280',
              borderColor: isDark ? '#374151' : '#e5e7eb',
              '&:hover': {
                bgcolor: isDark ? '#374151' : '#f9fafb',
                color: '#faa023',
                borderColor: '#faa023',
              },
            }}
          >
            Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function FeaturedMeetings({ timezone = 'Europe/Berlin' }) {
  const featured = meetings.filter(m => m.featured);

  if (featured.length === 0) return null;

  const hero = featured[0];
  const rest = featured.slice(1);

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#faa023',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          mb: 2,
          '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(250,160,35,0.3) 0%, transparent 100%)',
          },
        }}
      >
        <StarIcon sx={{ fontSize: 20 }} />
        <span>Featured Meetings</span>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        <FeaturedCard meeting={hero} timezone={timezone} isHero={true} />
        {rest.map(m => (
          <FeaturedCard key={m.id} meeting={m} timezone={timezone} isHero={false} />
        ))}
      </Box>
    </Box>
  );
}
