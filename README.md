# BarberBooking

[![Build Status](https://img.shields.io/github/actions/workflow/status/UccioFontana/BarberBooking/main.yml?branch=main&label=build)](https://github.com/UccioFontana/BarberBooking/actions)
[![License](https://img.shields.io/github/license/UccioFontana/BarberBooking)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/UccioFontana/BarberBooking.svg?style=social)](https://github.com/UccioFontana/BarberBooking/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/UccioFontana/BarberBooking.svg?style=social)](https://github.com/UccioFontana/BarberBooking/network)

---

BarberBooking is a modern and intuitive web platform for managing bookings in barber shops. It simplifies online booking, appointment organization, and staff management, offering an effective digital experience for both clients and professionals in the industry.

---

## Table of Contents

- [Main Features](#main-features)
- [Main Technologies and Dependencies](#main-technologies-and-dependencies)
- [Minimum Requirements / Prerequisites](#minimum-requirements--prerequisites)
- [Installation Instructions](#installation-instructions)
- [Basic Usage Guide](#basic-usage-guide)
- [Configuration](#configuration)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact and Author](#contact-and-author)

---

## Main Features

- **Online appointment booking** that is simple and fast.
- **Schedule management** for barbers' availability.
- **Dynamic calendar** with intuitive appointment display.
- **User management** with different roles (customers, barbers, administrators).
- **Automatic notifications** for appointment reminders (via email/internal system).
- **Admin panel** for overseeing and configuring the salon.
- **Appointment history** and essential reporting.
- **Data security** and user privacy compliance.

---

## Main Technologies and Dependencies

- **Frontend:** JavaScript framework (e.g., React.js or Vue.js)
- **Backend:** Server-side framework (e.g., Node.js, Express, or Django)
- **Database:** Relational or NoSQL database (e.g., PostgreSQL, MongoDB)
- **Authentication:** JWT or OAuth
- **Other libraries/frameworks:** Includes state management and HTTP clients (e.g., Redux, Axios)
- **Environment Management:** Dotenv for environment variables

---

## Minimum Requirements / Prerequisites

- **Node.js** v16.x or higher
- **npm** v8.x or higher
- **Database** running locally or remotely
- **Operating system:** Windows, macOS, or Linux

---

## Installation Instructions

Follow the steps below to run BarberBooking locally:

1. **Clone the repository**
    ```bash
    git clone https://github.com/UccioFontana/BarberBooking.git
    cd BarberBooking
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up the database**
    - Make sure your database server is running.
    - Apply existing migrations/schema if needed.

4. **Configure environment variables**  
    See the [Configuration](#configuration) section.

5. **Start the development server**
    ```bash
    npm run dev
    ```

---

## Basic Usage Guide

After completing installation:

- **Register/Login:** Access the platform as a customer or barber.
- **Book appointment:** Choose the service, select the desired time, and confirm the booking.
- **Manage appointments:** View, edit, or delete bookings from your personal calendar.
- **Admin area:** (if enabled) Manage hours, staff, and general supervision.
- **Receive notifications:** Get reminders and updates about your appointments.

---

## Configuration

BarberBooking requires certain environment variables to function.  
Create a `.env` file in the project root and insert the following parameters:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_smtp_provider
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

> **Note:** Never share sensitive `.env` data publicly.

---

## How to Contribute

Contributing to BarberBooking is a great way to support its development! Follow these steps:

1. **Fork the repository**
2. **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature-name
    ```
3. **Develop and test** your changes locally.
4. **Commit** your changes with clear, meaningful messages.
5. **Push the branch** to your fork.
6. **Open a Pull Request** describing your changes.

**Guidelines:**
- Follow project coding standards and best practices.
- Keep pull requests well-documented.
- For questions or suggestions, open an issue.

---

## License

This project is licensed under the GNU License. See the [LICENSE](LICENSE) file for details.

---

## Contact and Author

**Author / Maintainer:**  
Uccio Fontana

For requests, support, or collaboration, feel free to contact the author or open an issue directly on the repository.

---
