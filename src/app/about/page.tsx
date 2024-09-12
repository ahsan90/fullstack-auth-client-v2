export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        About Our Authentication System
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          Our authentication system provides a secure and scalable solution for
          managing user accounts, login sessions, and role-based access control.
          Built with a robust backend powered by Express.js, Passport.js,
          MongoDB, and Prisma, and a modern frontend developed using Next.js 14
          and NextAuth.js V5, it offers advanced features for both user
          management and security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li className="mb-2">
            <strong>Email & Password Authentication:</strong> Secure login (JWT
            with Cookie based session management) using email and password, with
            encryption and hashing mechanisms to protect sensitive data.
          </li>
          <li className="mb-2">
            <strong>Refresh Token Mechanism:</strong> Access tokens are
            refreshed automatically to extend user sessions without
            reauthentication, improving security and user experience.
          </li>
          <li className="mb-2">
            <strong>Password Reset & Forgot Password:</strong> Users can reset
            forgotten passwords via email with secure one-time links, ensuring
            account recovery with minimal risk.
          </li>
          <li className="mb-2">
            <strong>Advanced User Management:</strong> Full CRUD operations for
            managing users, allowing admins to create, read, update, and delete
            users efficiently.
          </li>
          <li className="mb-2">
            <strong>Role-Based Access Control (RBAC):</strong> Define roles like
            "ADMIN" and "USER" with specific access permissions to protect
            critical routes and data within the system.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li className="mb-2">
            <strong>Express.js (TypeScript):</strong> Our backend is powered by
            Express.js, providing a lightweight yet powerful framework for
            handling API requests, middleware, and routing.
          </li>
          <li className="mb-2">
            <strong>Passport.js:</strong> We use Passport.js for authentication
            strategies, ensuring extensible and modular authentication support
            for various login methods.
          </li>
          <li className="mb-2">
            <strong>MongoDB:</strong> User data is stored securely in MongoDB,
            providing a flexible and scalable NoSQL database solution.
          </li>
          <li className="mb-2">
            <strong>Prisma:</strong> Prisma ORM is utilized to interact with the
            database in a type-safe way, improving query performance and data
            management.
          </li>
          <li className="mb-2">
            <strong>Next.js 14:</strong> The frontend is built using Next.js 14
            for a fast and modern single-page application experience, along with
            server-side rendering and static generation for improved
            performance.
          </li>
          <li className="mb-2">
            <strong>NextAuth.js v5:</strong> Authentication is handled using
            NextAuth.js Version 5, providing secure user sessions, token
            management, and flexible authentication strategies.
          </li>
        </ul>
      </section>
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>
          &quot;copy; {new Date().getFullYear()} Codehouse Lab. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
