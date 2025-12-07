# Countdown Card

A simple countdown card for Home Assistant with live updating days, hours, minutes and seconds.

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click on the menu (three dots in the top right) and select "Custom repositories"
4. Add the URL of this repository
5. Select "Lovelace" as category
6. Click "Install"
7. Restart Home Assistant

### Manual

1. Download `countdown-card.js` from the latest release
2. Copy the file to `config/www/countdown-card.js`
3. Add the resource to your Lovelace configuration:
   ```yaml
   resources:
     - url: /local/countdown-card.js
       type: module
   ```

## Usage

```yaml
type: custom:countdown-card
title: "My Countdown"
end_date: "2024-12-31 23:59:59"
```

## Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | string | Yes | `custom:countdown-card` |
| `title` | string | No | Title of the card |
| `end_date` | string | Yes | End date in format "YYYY-MM-DD HH:MM:SS" |

## Examples

```yaml
type: custom:countdown-card
title: "New Year 2025"
end_date: "2025-01-01 00:00:00"
```

```yaml
type: custom:countdown-card
title: "Vacation"
end_date: "2024-07-15 12:00:00"
```
