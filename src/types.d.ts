import type { User } from "@clerk/nextjs/dist/api";
import type { Project } from "@prisma/client";

export type ProjectWithAuthor = Project & {
    author: User;
    status: ProjectStatus;
};

export type ProjectOverridden = Project & {
    status: ProjectStatus;
};

export type User = {
    readonly id: string;
    readonly passwordEnabled: boolean;
    readonly totpEnabled: boolean;
    readonly backupCodeEnabled: boolean;
    readonly twoFactorEnabled: boolean;
    readonly banned: boolean;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly profileImageUrl: string;
    readonly imageUrl: string;
    readonly gender: string;
    readonly birthday: string;
    readonly primaryEmailAddressId: string | null;
    readonly primaryPhoneNumberId: string | null;
    readonly primaryWeb3WalletId: string | null;
    readonly lastSignInAt: number | null;
    readonly externalId: string | null;
    readonly username: string | null;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly publicMetadata: UserPublicMetadata;
    readonly privateMetadata: Record<string, unknown>;
    readonly unsafeMetadata: UserUnsafeMetadata;
    readonly emailAddresses: EmailAddress[];
    readonly phoneNumbers: PhoneNumber[];
    readonly web3Wallets: Web3Wallet[];
    readonly externalAccounts: ExternalAccount[];
    constructor(
        id: string,
        passwordEnabled: boolean,
        totpEnabled: boolean,
        backupCodeEnabled: boolean,
        twoFactorEnabled: boolean,
        banned: boolean,
        createdAt: number,
        updatedAt: number,
        profileImageUrl: string,
        imageUrl: string,
        gender: string,
        birthday: string,
        primaryEmailAddressId: string | null,
        primaryPhoneNumberId: string | null,
        primaryWeb3WalletId: string | null,
        lastSignInAt: number | null,
        externalId: string | null,
        username: string | null,
        firstName: string | null,
        lastName: string | null,
        publicMetadata?: UserPublicMetadata,
        privateMetadata?: Record<string, unknown>,
        unsafeMetadata?: UserUnsafeMetadata,
        emailAddresses?: EmailAddress[],
        phoneNumbers?: PhoneNumber[],
        web3Wallets?: Web3Wallet[],
        externalAccounts?: ExternalAccount[]
    );
    static fromJSON(data: UserJSON): User;
};
