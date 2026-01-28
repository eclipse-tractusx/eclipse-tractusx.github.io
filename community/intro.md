---
title: Intro
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

You can add new meetings to the [Open Meetings](/community/open-meetings) calendar by editing the meeting data file. All meetings are displayed with timezone conversion support and appear in both the interactive calendar and the categorized lists.

:::tip Quick Start

To add a new meeting, edit the `data/meetings.js` file and add a new meeting object to the `meetings` array. The meeting will automatically appear in both the calendar and the list on the [Open Meetings page](/community/open-meetings).

:::

### Meeting Structure

Each meeting is defined as a JavaScript object with the following properties:

:::note Required Fields

- **`id`** (string): Unique identifier for the meeting (use kebab-case, e.g., `'my-new-meeting'`)
- **`title`** (string): Display name of the meeting
- **`category`** (string): Use `MEETING_CATEGORIES.GENERAL`, `MEETING_CATEGORIES.PRODUCT`, or `MEETING_CATEGORIES.ONE_TIME`
- **`description`** (string): Brief description of the meeting's purpose
- **`contact`** (string): Email address of the meeting organizer

:::

:::note Optional Fields

- **`sessionLink`** (string): URL to join the meeting (Teams, Zoom, etc.)
- **`additionalLinks`** (array): Additional resources like taskboards, repositories, or documentation
  - Each link is an object with `title` and `url` properties
- **`recurrence`** (object): Meeting schedule rules (set to `null` for on-demand meetings)

:::

### Recurrence Patterns

The `recurrence` object defines when and how often a meeting occurs:

:::info Weekly Meetings

```javascript
recurrence: {
  frequency: 'weekly',
  interval: 1,              // Every week (use 2 for bi-weekly, 3 for tri-weekly, etc.)
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

:::

:::info On-Demand Meetings

For meetings without a fixed schedule, set `recurrence` to `null`. These meetings will appear in the list but not in the calendar.

```javascript
recurrence: null
```

:::

### Complete Example

Here's a complete example of adding a new weekly product meeting:

```javascript
{
  id: 'my-product-weekly',
  title: 'My Product Weekly Sync',
  category: MEETING_CATEGORIES.PRODUCT,
  description: 'Weekly synchronization meeting for My Product development team. We discuss progress, blockers, and upcoming features.',
  contact: 'product.lead@example.com',
  sessionLink: 'https://teams.microsoft.com/l/meetup-join/...',
  additionalLinks: [
    { title: 'Product Roadmap', url: 'https://github.com/org/project/roadmap' },
    { title: 'Issue Tracker', url: 'https://github.com/org/project/issues' },
    { title: 'Documentation', url: 'https://docs.example.com/my-product' },
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

### Category Colors

Meetings are color-coded in the calendar based on their category:

- 🔵 **General Office Hours** (`MEETING_CATEGORIES.GENERAL`) - Blue
- 🟢 **Product Meetings** (`MEETING_CATEGORIES.PRODUCT`) - Green
- 🟠 **One-time Meetings** (`MEETING_CATEGORIES.ONE_TIME`) - Orange

### Timezone Information

:::warning Important

All meeting times in `data/meetings.js` must be specified in **Europe/Berlin timezone** (CET/CEST). The system will automatically convert these times to the user's selected timezone for display.

- Winter time (CET): UTC+1
- Summer time (CEST): UTC+2

:::

### Step-by-Step Guide

1. **Open the file**: `data/meetings.js`
2. **Choose the appropriate section**: Add your meeting to the `// General Office Hours`, `// Product Regular Meetings`, or `// One-time meetings` section
3. **Copy an existing meeting** as a template
4. **Update all fields** with your meeting information
5. **Set the correct category** using `MEETING_CATEGORIES.*`
6. **Define the recurrence** pattern or set to `null`
7. **Save the file** and build the project to verify
8. **Create a pull request** with your changes

:::caution Testing Your Changes

After adding a meeting, run the following commands to verify:

```bash
npm run build
npm run serve
```

Then navigate to `/community/open-meetings` and verify:
- ✅ Meeting appears in the correct category section
- ✅ Meeting shows in the calendar (if it has a recurrence)
- ✅ Times display correctly when switching timezones
- ✅ All links work correctly

:::
