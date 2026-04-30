---
title: Community Guide
---

## Tractus-X Community

We warmly welcome You to shape the automotive value chain of the next generation!
The global Tractus-X community consists of a broad range of users, contributors, and committers from various companies
(and individual actors) in the automotive value chain. We sincerely invite anyone to participate who wants to shape our
architecture, reference implementations KITs for our Catena-X data space.

## Communication Rules

A pre-requisite for joining the Tractus-X communication channels is
an [Eclipse Foundation Account](https://accounts.eclipse.org/user/register?destination=user).

In addition, we encourage you to sign the Eclipse Contribution Agreement (ECA) to contribute to our Tractus-X project.
For example, report and fix bugs or implement enhancements according to the Tractus-X roadmap. See
our [contributing guide](https://eclipse-tractusx.github.io/docs/oss/how-to-contribute).

- __For a first contact__ please use our Tractus-X mailing list (tractusx-dev@eclipse.org) to get in touch with our
  community or a specific product team you want to contribute.
- __For quick and informal syncs__ please use
  our [Eclipse Matrix Space](https://matrix.to/#/#automotive.tractusx:matrix.eclipse.org) to align on easy topics, ask
  questions, share a link or a bite-size piece of information.
- __For product alignments__ please set up a meeting with a tool of your choice as a project manager. The preparation of
  meeting minutes is not required. Recurring formal meetings must be communicated via our Tractus-X mailing list. Ad hoc
  informal meetings may be organized without prior notice.
- __For cross-product alignments__ there are office hours listed in the [Open Meetings](/community/open-meetings) which can be used for aligning product development, KITs and overall project topics.

## How to Create Open Meetings

You can add new meetings to the [Open Meetings](/community/open-meetings) calendar by editing the meeting data file. All meetings are displayed with timezone conversion support, public holiday detection, and appear across the interactive hub views (Featured, Today, Calendar, and All Meetings).

:::tip Quick Start

To add a new meeting, edit the `data/meetings.js` file and add a new meeting object to the `meetings` array. The meeting will automatically appear across all views on the [Open Meetings page](/community/open-meetings).

:::

### Meeting Structure

Each meeting is defined as a JavaScript object with the following properties:

:::note Required Fields

- **`id`** (string): Unique identifier for the meeting (use kebab-case, e.g., `'my-new-meeting'`)
- **`title`** (string): Display name of the meeting
- **`category`** (string): Use `MEETING_CATEGORIES.GENERAL`, `MEETING_CATEGORIES.PRODUCT`, or `MEETING_CATEGORIES.ONE_TIME`
- **`description`** (string): Brief description of the meeting's purpose
- **`contact`** (object or array): Contact person(s) — reference entries from the `CONTACTS` map (e.g., `CONTACTS.STEPHAN_BAUER`). Use an array for multiple contacts: `[CONTACTS.STEPHAN_BAUER, CONTACTS.MATHIAS_MOSER]`

:::

:::note Optional Fields

- **`icon`** (string): Material Icons Outlined icon name (e.g., `'forum'`, `'hub'`, `'cable'`). Browse icons at [fonts.google.com/icons](https://fonts.google.com/icons?icon.set=Material+Icons&icon.style=Outlined)
- **`priority`** (string): Visual importance level
  - `MEETING_PRIORITIES.HIGHLIGHT` — Full-width hero banner with countdown (for major events — prepare ahead)
  - `MEETING_PRIORITIES.FEATURED` — Double-width card (for key recurring meetings — don't miss)
  - Omit for standard-sized cards
- **`sessionLink`** (string): URL to join the meeting (Teams, Zoom, etc.)
- **`registrationLink`** (string): URL for event registration (separate from the session link). Useful for onsite or hybrid events where attendees must register in advance
- **`matrixChatUrl`** (string): URL to the meeting's Matrix chat room
- **`onsite`** (boolean): Set to `true` for in-person events. Displays a green "Onsite" badge
- **`location`** (string): Physical venue address for onsite events (e.g., `'ARENA2036 e.V., Stuttgart, Germany'`). Also used as the `LOCATION` field in exported `.ics` calendar files
- **`additionalLinks`** (array): Additional resources like taskboards, repositories, or documentation
  - Each link is an object with `title` (string) and `url` (string) properties
- **`recurrence`** (object): Meeting schedule rules (set to `null` for on-demand meetings)

:::

### Contact Persons

Contacts are centralized in the `CONTACTS` map at the top of `data/meetings.js` to avoid duplication. Each contact has:

```javascript
CONTACTS.MY_NAME: {
  name: 'Full Name',
  title: 'Role Title',
  email: 'email@example.com',
  github: 'github-username',        // Optional
  linkedin: 'linkedin-slug',        // Optional
  country: 'DE',                     // ISO 3166-1 alpha-2 — used for public holiday detection
}
```

The `country` field determines which public holidays are detected for a meeting. When a meeting falls on a public holiday in a contact's country, a holiday alert is shown on the card.

To add a new contact, add an entry to the `CONTACTS` map and reference it in your meeting's `contact` field.

### Recurrence Patterns

The `recurrence` object defines when and how often a meeting occurs:

:::info Weekly Meetings

```javascript
recurrence: {
  frequency: 'weekly',
  interval: 1,              // Every week (use 2 for bi-weekly, 4 for monthly, etc.)
  daysOfWeek: ['monday'],   // Can be multiple days: ['monday', 'wednesday']
  startTime: '10:00',       // 24-hour format in Europe/Berlin timezone
  endTime: '11:00',
  validFrom: '2025-01-01',  // Optional: when this schedule starts
  validUntil: '2025-12-31', // Optional: when this schedule ends
}
```

:::

:::info Daily Meetings

```javascript
recurrence: {
  frequency: 'daily',
  interval: 1,
  daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], // Weekdays only
  startTime: '09:00',
  endTime: '09:30',
  validFrom: '2025-11-04',
  validUntil: '2025-11-21',
}
```

:::

:::info One-Time Meetings

```javascript
recurrence: {
  frequency: 'once',
  startDate: '2025-12-15',  // ISO format: YYYY-MM-DD
  startTime: '14:00',
  endTime: '15:30',
}
```

For multi-day events, also specify `endDate`:

```javascript
recurrence: {
  frequency: 'once',
  startDate: '2026-07-02',
  endDate: '2026-07-03',
  startTime: '09:00',
  endTime: '17:00',
}
```

:::

:::info On-Demand Meetings

For meetings without a fixed schedule, set `recurrence` to `null`. These meetings will appear in the list but not in the calendar.

```javascript
recurrence: null
```

:::

### Complete Examples

#### Standard Weekly Product Meeting

```javascript
{
  id: 'my-product-weekly',
  title: 'My Product Weekly Sync',
  icon: 'sync',
  category: MEETING_CATEGORIES.PRODUCT,
  description: 'Weekly synchronization for My Product development team.',
  contact: CONTACTS.MY_NAME,
  sessionLink: 'https://teams.microsoft.com/l/meetup-join/...',
  matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-my-product:matrix.eclipse.org',
  additionalLinks: [
    { title: 'Product Roadmap', url: 'https://github.com/org/project/roadmap' },
    { title: 'Issue Tracker', url: 'https://github.com/org/project/issues' },
  ],
  recurrence: {
    frequency: 'weekly',
    interval: 1,
    daysOfWeek: ['thursday'],
    startTime: '15:00',
    endTime: '16:00',
  },
}
```

#### Featured Recurring Meeting

```javascript
{
  id: 'important-office-hour',
  title: 'Important Office Hour',
  icon: 'forum',
  category: MEETING_CATEGORIES.GENERAL,
  priority: MEETING_PRIORITIES.FEATURED,
  description: 'A key recurring meeting that gets a double-width card.',
  contact: [CONTACTS.STEPHAN_BAUER, CONTACTS.MATHIAS_MOSER],
  sessionLink: 'https://teams.microsoft.com/l/meetup-join/...',
  matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx:matrix.eclipse.org',
  additionalLinks: [],
  recurrence: {
    frequency: 'weekly',
    interval: 1,
    daysOfWeek: ['friday'],
    startTime: '10:00',
    endTime: '11:00',
  },
}
```

#### Highlight Onsite Event (with Registration)

```javascript
{
  id: 'community-days-2026',
  title: 'Community Days 2026',
  category: MEETING_CATEGORIES.ONE_TIME,
  priority: MEETING_PRIORITIES.HIGHLIGHT,
  onsite: true,
  location: 'ARENA2036 e.V., Stuttgart, Germany',
  description: 'Two full days of keynotes, workshops, and networking.',
  contact: [CONTACTS.STEPHAN_BAUER, CONTACTS.MATHIAS_MOSER],
  registrationLink: 'https://eveeno.com/my-event',
  matrixChatUrl: 'https://chat.eclipse.org/#/room/#tractusx-community-events:matrix.eclipse.org',
  additionalLinks: [
    { title: 'Event Blog Post', url: '/blog/community-days-2026' },
  ],
  recurrence: {
    frequency: 'once',
    startDate: '2026-07-02',
    endDate: '2026-07-03',
    startTime: '09:00',
    endTime: '17:00',
  },
}
```

#### Hybrid Event (Session Link + Registration)

Events can have both a `sessionLink` (for remote attendees) and a `registrationLink` (for onsite registration). Both buttons will appear in the UI.

### Category Colors

Meetings are color-coded based on their category:

- 🔵 **General Office Hours** (`MEETING_CATEGORIES.GENERAL`) — Blue
- 🟢 **Product Meetings** (`MEETING_CATEGORIES.PRODUCT`) — Green
- 🟠 **One-time Meetings** (`MEETING_CATEGORIES.ONE_TIME`) — Orange

### Priority Levels

- **Highlight** — Full-width hero banner at the top of the page with a countdown timer. Use for major events like Community Days.
- **Featured** — Double-width card in the Featured view. Use for key recurring meetings like the Community Office Hour or Committer Meeting.
- **Standard** (no priority set) — Regular-sized card. Use for standard product syncs and regular meetings.

### Timezone Information

:::warning Important

All meeting times in `data/meetings.js` must be specified in **Europe/Berlin timezone** (CET/CEST). The system will automatically convert these times to the user's selected timezone for display, including automatic DST adjustment.

- Winter time (CET): UTC+1
- Summer time (CEST): UTC+2

:::

### Step-by-Step Guide

1. **Open the file**: `data/meetings.js`
2. **Add a contact** (if needed): Add a new entry to the `CONTACTS` map with `name`, `title`, `email`, `country`, and optional `github`/`linkedin`
3. **Choose the appropriate section**: Add your meeting to `// General Office Hours`, `// Product Regular Meetings`, or `// One-time meetings`
4. **Copy an existing meeting** as a template
5. **Update all fields** with your meeting information
6. **Set the correct category** using `MEETING_CATEGORIES.*`
7. **Set priority** if applicable (`MEETING_PRIORITIES.HIGHLIGHT` or `MEETING_PRIORITIES.FEATURED`)
8. **Define the recurrence** pattern or set to `null`
9. **Save the file** and build the project to verify
10. **Create a pull request** with your changes

:::caution Testing Your Changes

After adding a meeting, run the following commands to verify:

```bash
npm run build
npm run serve
```

Then navigate to `/community/open-meetings` and verify:
- ✅ Meeting appears in the correct category with the right color badge
- ✅ Meeting shows in the calendar (if it has a recurrence)
- ✅ Times display correctly when switching timezones
- ✅ All links work correctly (session, registration, additional links)
- ✅ Contact information displays properly
- ✅ Onsite badge appears (if `onsite: true`)
- ✅ Priority display is correct (highlight hero or featured card)
- ✅ Calendar download (.ics) works and includes all meeting details

:::
