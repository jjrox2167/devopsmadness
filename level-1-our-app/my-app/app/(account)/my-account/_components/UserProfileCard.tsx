"use client";

import * as React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Github, Globe, Linkedin, MapPin, Twitter } from "lucide-react";

type ProfileCardProps = {
  coverUrl: string;
  avatarUrl: string;
  name: string;
  title: string;
  company: string;
  location: string;
  joinedLabel: string;
  bio: string;
  links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  onFollow?: () => void;
  onMessage?: () => void;
};

export function UserProfileCard({
  coverUrl,
  avatarUrl,
  name,
  title,
  company,
  location,
  joinedLabel,
  bio,
  links,
  onFollow,
  onMessage,
}: ProfileCardProps) {
  return (
    <Card className="group/card overflow-hidden pt-0">
      {/* Cover */}
      <div
        className="h-32 bg-muted bg-cover bg-center sm:h-40"
        style={{ backgroundImage: `url("${coverUrl}")` }}
      />

      <CardContent className="relative px-6 pb-6 group-data-[size=sm]/card:px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          {/* Avatar (overlaps cover) */}
          <Avatar className="-mt-12 size-24 border-4 border-card shadow-lg sm:-mt-16 sm:size-32">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback>
              {name
                .split(" ")
                .slice(0, 2)
                .map((p) => p[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Main info */}
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold">{name}</h1>

            <p className="text-muted-foreground">
              {title}
              <span>
                {" "}
                at <span className="font-medium">{company}</span>
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {location}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" aria-hidden="true" />
                {joinedLabel}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={onFollow}>Follow</Button>
            <Button variant="outline" onClick={onMessage}>
              Message
            </Button>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-muted-foreground">{bio}</p>

        {/* Social buttons */}
        <div className="mt-4 flex items-center gap-2">
          {links?.twitter ? (
            <Button asChild variant="ghost" size="icon">
              <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="size-4" aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          ) : null}

          {links?.linkedin ? (
            <Button asChild variant="ghost" size="icon">
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-4" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          ) : null}

          {links?.github ? (
            <Button asChild variant="ghost" size="icon">
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <Github className="size-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          ) : null}

          {links?.website ? (
            <Button asChild variant="ghost" size="icon">
              <a href={links.website} target="_blank" rel="noopener noreferrer">
                <Globe className="size-4" aria-hidden="true" />
                <span className="sr-only">Website</span>
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
