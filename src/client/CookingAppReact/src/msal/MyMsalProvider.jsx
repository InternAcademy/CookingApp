'use client'

import { useEffect } from "react";
import { initializeMsal, msalInstance } from "./msal";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react"
import UnauthorizedMessage from "../components/auth/UnauthorizedMessage";

export default function MyMsalProvider({ children }) {
    useEffect(() => {
        initializeMsal();
    }, []);

    return (
        <MsalProvider instance={msalInstance}>
            <AuthenticatedTemplate>
                {children}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <UnauthorizedMessage />
            </UnauthenticatedTemplate>
        </MsalProvider>
    );
};