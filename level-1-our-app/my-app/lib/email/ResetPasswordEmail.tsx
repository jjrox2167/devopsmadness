import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Img,
  Font,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  username: string;
  userEmail: string;
  resetUrl: string;
  token: string;
}

const ResetPasswordEmail = (props: ResetPasswordEmailProps) => {
  const { username, userEmail, resetUrl } = props;
  const requestTime = "November 11, 2025 11:34 AM CST";

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://rsms.me/inter/inter.css",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
      </Head>

      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={headerSection}>
            <Img
              src="https://via.placeholder.com/48x48/2563eb/ffffff?text=Logo"
              alt="Company Logo"
              width={48}
              height={48}
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={heading}>Password Reset Request</Text>

            <Text style={greeting}>Hello {username},</Text>

            <Text style={bodyText}>
              We received a request to reset the password for your account
              associated with <span style={emailText}>{userEmail}</span>.
            </Text>

            {/* Request Details */}
            <Section style={detailsCard}>
              <table style={detailsTable}>
                <tr>
                  <td style={detailsLabel}>Request Time:</td>
                  <td style={detailsValue}>{requestTime}</td>
                </tr>
              </table>
            </Section>

            <Text style={instructionText}>
              To proceed with resetting your password, please click the button
              below. This link will remain valid for 15 minutes.
            </Text>

            <div style={buttonContainer}>
              <Button href={resetUrl} style={primaryButton}>
                Reset Password
              </Button>
            </div>

            <Text style={alternativeText}>
              If the button above doesn&apos;t work, copy and paste this URL into
              your browser:
            </Text>
            <div style={urlBox}>
              <Text style={urlText}>{resetUrl}</Text>
            </div>

            {/* Security Notice */}
            <Section style={securityNotice}>
              <Text style={securityText}>
                For your security, this link will expire in 15 minutes.
              </Text>
            </Section>
          </Section>

          {/* Warning Section */}
          <Section style={warningSection}>
            <Text style={warningHeading}>
              If you did not request this password reset
            </Text>

            <Text style={warningText}>
              Please take the following actions immediately:
            </Text>

            <table style={stepsList}>
              <tr>
                <td style={stepNumber}>1.</td>
                <td style={stepText}>
                  Disregard this email—your password remains secure
                </td>
              </tr>
              <tr>
                <td style={stepNumber}>2.</td>
                <td style={stepText}>
                  Review your recent account activity
                </td>
              </tr>
              <tr>
                <td style={stepNumber}>3.</td>
                <td style={stepText}>
                  Contact our support team at{" "}
                  <a href="mailto:support@yourapp.com" style={emailLink}>
                    support@yourapp.com
                  </a>
                </td>
              </tr>
            </table>

            <Button
              href="https://example.com/security"
              style={secondaryButton}
            >
              Review Account Security
            </Button>
          </Section>

          {/* 2FA Recommendation */}
          <Section style={recommendationSection}>
            <Text style={recommendationHeading}>
              Strengthen Your Account Security
            </Text>
            <Text style={recommendationText}>
              We recommend enabling two-factor authentication to add an
              additional layer of protection to your account.
            </Text>
            <Button href="https://example.com/settings/2fa" style={tertiaryButton}>
              Enable Two-Factor Authentication
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              This is an automated security notification. Please do not reply to
              this email.
            </Text>
            <Text style={footerText}>
              © 2025 Your Company Name. All rights reserved.
              <br />
              123 Business Street, Middleton, WI 53562
            </Text>
            <Text style={footerLinks}>
              <a href="https://example.com/privacy" style={footerLink}>
                Privacy Policy
              </a>
              {" · "}
              <a href="https://example.com/terms" style={footerLink}>
                Terms of Service
              </a>
              {" · "}
              <a href="#" style={footerLink}>
                Unsubscribe
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Inline styles
const main = {
  backgroundColor: "#f5f5f7",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  padding: "40px 20px",
};

const container = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e5e5e7",
};

const headerSection = {
  padding: "32px 40px 24px",
  borderBottom: "1px solid #e5e5e7",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  padding: "40px 40px 32px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1d1d1f",
  margin: "0 0 24px",
  lineHeight: "1.3",
};

const greeting = {
  fontSize: "16px",
  color: "#1d1d1f",
  margin: "0 0 16px",
  fontWeight: "500",
};

const bodyText = {
  fontSize: "15px",
  color: "#424245",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const emailText = {
  fontWeight: "600",
  color: "#1d1d1f",
};

const detailsCard = {
  backgroundColor: "#f5f5f7",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "0 0 24px",
  border: "1px solid #e5e5e7",
};

const detailsTable = {
  width: "100%",
};

const detailsLabel = {
  fontSize: "13px",
  color: "#86868b",
  fontWeight: "500",
  paddingRight: "12px",
};

const detailsValue = {
  fontSize: "13px",
  color: "#1d1d1f",
  fontWeight: "500",
};

const instructionText = {
  fontSize: "15px",
  color: "#424245",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "0 0 32px",
};

const primaryButton = {
  display: "inline-block",
  backgroundColor: "#0071e3",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "6px",
  textAlign: "center" as const,
  border: "none",
};

const alternativeText = {
  fontSize: "13px",
  color: "#86868b",
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const urlBox = {
  backgroundColor: "#f5f5f7",
  border: "1px solid #e5e5e7",
  borderRadius: "6px",
  padding: "16px",
  margin: "0 0 24px",
  wordBreak: "break-all" as const,
};

const urlText = {
  fontSize: "13px",
  color: "#0071e3",
  margin: "0",
  lineHeight: "1.5",
};

const securityNotice = {
  backgroundColor: "#fff9e6",
  border: "1px solid #ffeaa7",
  borderRadius: "6px",
  padding: "16px 20px",
  margin: "0",
};

const securityText = {
  fontSize: "14px",
  color: "#6e5a00",
  margin: "0",
  textAlign: "center" as const,
  fontWeight: "500",
};

const warningSection = {
  margin: "0",
  padding: "32px 40px",
  backgroundColor: "#fafafa",
  borderTop: "1px solid #e5e5e7",
  borderBottom: "1px solid #e5e5e7",
};

const warningHeading = {
  fontSize: "17px",
  fontWeight: "600",
  color: "#1d1d1f",
  margin: "0 0 12px",
};

const warningText = {
  fontSize: "15px",
  color: "#424245",
  margin: "0 0 20px",
  lineHeight: "1.5",
};

const stepsList = {
  width: "100%",
  marginBottom: "24px",
};

const stepNumber = {
  fontSize: "14px",
  color: "#86868b",
  fontWeight: "600",
  width: "24px",
  verticalAlign: "top",
  paddingTop: "2px",
};

const stepText = {
  fontSize: "14px",
  color: "#424245",
  lineHeight: "1.6",
  paddingBottom: "12px",
};

const emailLink = {
  color: "#0071e3",
  textDecoration: "none",
};

const secondaryButton = {
  display: "inline-block",
  backgroundColor: "#1d1d1f",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "12px 28px",
  borderRadius: "6px",
  textAlign: "center" as const,
  border: "none",
};

const recommendationSection = {
  padding: "32px 40px",
  textAlign: "center" as const,
};

const recommendationHeading = {
  fontSize: "17px",
  fontWeight: "600",
  color: "#1d1d1f",
  margin: "0 0 12px",
};

const recommendationText = {
  fontSize: "14px",
  color: "#424245",
  lineHeight: "1.6",
  margin: "0 0 20px",
};

const tertiaryButton = {
  display: "inline-block",
  backgroundColor: "#ffffff",
  color: "#0071e3",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "6px",
  textAlign: "center" as const,
  border: "1px solid #0071e3",
};

const footer = {
  padding: "32px 40px",
  textAlign: "center" as const,
  backgroundColor: "#fafafa",
};

const divider = {
  borderColor: "#e5e5e7",
  margin: "0 0 24px",
};

const footerText = {
  fontSize: "12px",
  color: "#86868b",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

const footerLinks = {
  fontSize: "12px",
  margin: "0",
};

const footerLink = {
  color: "#0071e3",
  textDecoration: "none",
};

export default ResetPasswordEmail;