class CountdownCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._interval = null;
  }

  setConfig(config) {
    if (!config.end_date) {
      throw new Error('You need to define end_date');
    }

    this._config = config;
    this._endDate = new Date(config.end_date);
    
    if (isNaN(this._endDate.getTime())) {
      throw new Error('Invalid end_date format. Use "YYYY-MM-DD HH:MM:SS"');
    }

    this._render();
    this._startCountdown();
  }

  set hass(hass) {
    this._hass = hass;
  }

  disconnectedCallback() {
    this._stopCountdown();
  }

  _startCountdown() {
    this._stopCountdown();
    this._updateCountdown();
    this._interval = setInterval(() => this._updateCountdown(), 1000);
  }

  _stopCountdown() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  _updateCountdown() {
    const now = new Date();
    const diff = this._endDate - now;

    if (diff <= 0) {
      this._displayTime(0, 0, 0, 0);
      this._stopCountdown();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this._displayTime(days, hours, minutes, seconds);
  }

  _displayTime(days, hours, minutes, seconds) {
    const countdownElement = this.shadowRoot.querySelector('.countdown');
    if (countdownElement) {
      countdownElement.innerHTML = `
        <div class="time-unit">
          <div class="time-value">${days}</div>
          <div class="time-label">Days</div>
        </div>
        <div class="time-unit">
          <div class="time-value">${String(hours).padStart(2, '0')}</div>
          <div class="time-label">Hours</div>
        </div>
        <div class="time-unit">
          <div class="time-value">${String(minutes).padStart(2, '0')}</div>
          <div class="time-label">Minutes</div>
        </div>
        <div class="time-unit">
          <div class="time-value">${String(seconds).padStart(2, '0')}</div>
          <div class="time-label">Seconds</div>
        </div>
      `;
    }
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          box-sizing: border-box;
        }
        .card-header {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 16px;
          color: var(--primary-text-color);
        }
        .countdown {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 8px;
        }
        .time-unit {
          text-align: center;
          flex: 1;
        }
        .time-value {
          font-size: 48px;
          font-weight: 300;
          line-height: 1;
          color: var(--primary-text-color);
        }
        .time-label {
          font-size: 12px;
          text-transform: uppercase;
          margin-top: 4px;
          color: var(--secondary-text-color);
          opacity: 0.7;
        }
        @media (max-width: 600px) {
          .time-value {
            font-size: 36px;
          }
          .time-label {
            font-size: 10px;
          }
        }
      </style>
      <ha-card>
        ${this._config.title ? `<div class="card-header">${this._config.title}</div>` : ''}
        <div class="countdown"></div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement('countdown-card-editor');
  }

  static getStubConfig() {
    return {
      title: 'Countdown',
      end_date: '2024-12-31 23:59:59'
    };
  }
}

customElements.define('countdown-card', CountdownCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'countdown-card',
  name: 'Countdown Card',
  description: 'A simple countdown card with live updating timer',
  preview: true,
  documentationURL: 'https://github.com/josa42/homeassistant-countdown-card'
});
