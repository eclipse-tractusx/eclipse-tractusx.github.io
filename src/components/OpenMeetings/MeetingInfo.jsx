/*********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useColorMode } from '@docusaurus/theme-common';
import { getScheduleDescription, getCategoryColor } from '@site/src/utils/meetingUtils';
import BrowserOnly from '@docusaurus/BrowserOnly';

const CATEGORY_LABELS = {
  general: 'General',
  product: 'Product',
  'one-time': 'Event',
};

export default function MeetingInfo({title, schedule, description, contact, sessionLink = undefined, meetingLink = undefined, additionalLinks = [], meetingData = null, timezone = 'Europe/Berlin'}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const category = meetingData?.category;
    const categoryColor = category ? getCategoryColor(category) : '#999';
    const categoryLabel = category ? (CATEGORY_LABELS[category] || category) : '';
    const image = meetingData?.image;

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <Card
            component="section"
            id={title}
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: isExpanded
                    ? 'rgba(250,160,35,0.25)'
                    : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: isDark ? '#1e2127' : '#fff',
                boxShadow: isExpanded
                    ? (isDark ? '0 8px 32px rgba(250,160,35,0.15), 0 2px 8px rgba(0,0,0,0.2)' : '0 8px 32px rgba(250,160,35,0.14), 0 2px 8px rgba(0,0,0,0.06)')
                    : (isDark ? '0 1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)'),
                transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s, border-color 0.3s',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                '@media (hover: hover)': {
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        borderColor: 'rgba(250,160,35,0.2)',
                        boxShadow: isDark
                            ? '0 8px 32px rgba(250,160,35,0.15), 0 2px 8px rgba(0,0,0,0.2)'
                            : '0 8px 32px rgba(250,160,35,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                    },
                    '&:hover img': { transform: 'scale(1.06)' },
                },
                '&:hover .hash-link': { opacity: 1 },
            }}
        >
            {image && (
                <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    loading="lazy"
                    sx={{
                        height: { xs: 120, sm: 160 },
                        objectFit: 'cover',
                        background: 'linear-gradient(135deg, #faa023 0%, #ff8c42 100%)',
                        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                />
            )}

            <CardContent
                sx={{
                    p: { xs: '1.15rem 1.25rem 1.25rem', sm: '1.25rem 1.5rem 1.5rem' },
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    '&:last-child': { pb: '1.5rem' },
                }}
            >
                {categoryLabel && (
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
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.2)',
                        }}
                    />
                )}

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        mb: 0.5,
                        lineHeight: 1.35,
                        color: isDark ? '#f3f4f6' : '#1a1a2e',
                        letterSpacing: '-0.01em',
                    }}
                >
                    {title}
                    <a className="hash-link" href={`#${title}`} title="Direct link to open meeting"
                       onClick={(e) => e.stopPropagation()}
                       style={{ opacity: 0, transition: 'opacity 0.2s' }}>{' '}</a>
                </Typography>

                <BrowserOnly fallback={<Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.8rem', mb: 0.75 }}>{schedule}</Typography>}>
                  {() => {
                    const displaySchedule = meetingData
                      ? getScheduleDescription(meetingData, timezone)
                      : schedule;
                    return (
                        <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.8rem', mb: 0.75 }}>
                            {displaySchedule}
                        </Typography>
                    );
                  }}
                </BrowserOnly>

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.85rem',
                        color: isDark ? '#d1d5db' : '#4b5563',
                        lineHeight: 1.65,
                        mb: 1,
                        ...(!isExpanded && {
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }),
                    }}
                >
                    {description}
                </Typography>

                {sessionLink && (
                    <Button
                        variant="contained"
                        fullWidth
                        href={sessionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            bgcolor: '#faa023',
                            color: '#fff',
                            borderRadius: '5px',
                            fontFamily: '"Manrope", sans-serif',
                            fontSize: { xs: '13px', sm: '14px' },
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 0.8,
                            mb: 1,
                            boxShadow: 'none',
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

                <Button
                    size="small"
                    onClick={handleToggle}
                    aria-expanded={isExpanded}
                    aria-controls={`meeting-details-${title}`}
                    endIcon={isExpanded ? <ExpandLessIcon sx={{ fontSize: '18px !important' }} /> : <ExpandMoreIcon sx={{ fontSize: '18px !important' }} />}
                    sx={{
                        color: isDark ? '#9ca3af' : '#6b7280',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        mt: 'auto',
                        width: 'fit-content',
                        p: '0.3rem 0.5rem',
                        letterSpacing: '0.01em',
                        '&:hover': { color: '#faa023', bgcolor: 'transparent' },
                    }}
                >
                    {isExpanded ? 'Hide details' : 'Show details'}
                </Button>

                <Collapse in={isExpanded} timeout={350}>
                    <Box id={`meeting-details-${title}`}>
                        <Divider sx={{ mt: 1, mb: 1.5, borderColor: isDark ? '#374151' : '#f3f4f6' }} />

                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    color: isDark ? '#6b7280' : '#9ca3af',
                                    display: 'block',
                                    mb: 0.25,
                                }}
                            >
                                Contact
                            </Typography>
                            <Link
                                href={`mailto:${contact}`}
                                sx={{
                                    fontSize: '0.82rem',
                                    color: '#faa023',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#e89012', textDecoration: 'underline' },
                                }}
                            >
                                {contact}
                            </Link>
                        </Box>

                        {meetingLink && (
                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontSize: '0.68rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.06em',
                                        color: isDark ? '#6b7280' : '#9ca3af',
                                        display: 'block',
                                        mb: 0.25,
                                    }}
                                >
                                    Calendar
                                </Typography>
                                <Link
                                    href={meetingLink}
                                    sx={{
                                        fontSize: '0.82rem',
                                        color: '#faa023',
                                        textDecoration: 'none',
                                        '&:hover': { color: '#e89012', textDecoration: 'underline' },
                                    }}
                                >
                                    Download calendar file
                                </Link>
                            </Box>
                        )}

                        {additionalLinks.length > 0 && (
                            <Box>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontSize: '0.68rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.06em',
                                        color: isDark ? '#6b7280' : '#9ca3af',
                                        display: 'block',
                                        mb: 0.25,
                                    }}
                                >
                                    Links
                                </Typography>
                                <List dense disablePadding>
                                    {additionalLinks.map((link, index) => (
                                        <ListItem key={`${index}${link.url}`} disableGutters disablePadding sx={{ display: 'list-item', mb: 0.25 }}>
                                            <Link
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    fontSize: '0.82rem',
                                                    color: '#faa023',
                                                    textDecoration: 'none',
                                                    '&:hover': { color: '#e89012', textDecoration: 'underline' },
                                                }}
                                            >
                                                {link.title}
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
}
