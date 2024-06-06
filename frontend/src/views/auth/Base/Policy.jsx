import React from 'react';

function Policy() {
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  const titleStyle = {
    fontSize: '24px',
  };

  const subtitleStyle = {
    fontSize: '18px',
  };

  const textStyle = {
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Privacy Policy</h1>
      <p style={textStyle}>Last updated: June 6, 2024</p>

      <h2 style={subtitleStyle}>1. Introduction</h2>
      <p style={textStyle}>
        Welcome to Airneis. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regards to your personal information, please contact us at airneis@gmail.com.
      </p>

      <h2 style={subtitleStyle}>2. Information We Collect</h2>
      <p style={textStyle}>
        We collect personal information that you voluntarily provide to us when you register on the Website Airneis, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website Airneis (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
      </p>
      <p style={textStyle}>
        The personal information that we collect depends on the context of your interactions with us and the Website Airneis, the choices you make and the products and features you use. The personal information we collect may include the following:
      </p>
      <ul style={textStyle}>
        <li>Name and Contact Data: We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
        <li>Credentials: We collect passwords, password hints, and similar security information used for authentication and account access.</li>
      </ul>

      <h2 style={subtitleStyle}>3. How We Use Your Information</h2>
      <p style={textStyle}>
        We use personal information collected via our Website Airneis for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
      </p>
      <ul style={textStyle}>
        <li>To facilitate account creation and logon process.</li>
        <li>To send administrative information to you for business purposes, legal reasons, and/or possibly contractual.</li>
        <li>Fulfill and manage your orders.</li>
        <li>To manage user accounts.</li>
        <li>To send you marketing and promotional communications.</li>
      </ul>

      <h2 style={subtitleStyle}>4. Sharing Your Information</h2>
      <p style={textStyle}>
        We may process or share data based on the following legal basis:
      </p>
      <ul style={textStyle}>
        <li>Consent: We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
        <li>Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
        <li>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
        <li>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
      </ul>

      <h2 style={subtitleStyle}>5. Security of Your Information</h2>
      <p style={textStyle}>
        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
      </p>

      <h2 style={subtitleStyle}>6. Your Privacy Rights</h2>
      <p style={textStyle}>
        In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
      </p>

      <h2 style={subtitleStyle}>7. Contact Us</h2>
      <p style={textStyle}>
        If you have questions or comments about this policy, you may contact our Data Protection Officer (DPO), [DPO Name], by email at airneis@gmail.com, or by post to:
      </p>
      <p style={textStyle}>
        Airneis <br />
        76 Rue de Luxembourg <br />
        CParis, 58000 <br />
        France <br />
      </p>
    </div>
  );
}

export default Policy;
