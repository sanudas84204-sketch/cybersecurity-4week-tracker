"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const scheduleTemplate = {
  Monday: {
    tasks: [
      "Networking Theory",
      "Subnetting Practice",
      "Revision + Notes"
    ],
    resources: [
      { name: "Cisco Networking Basics", link: "https://skillsforall.com" },
      { name: "Professor Messer Network+", link: "https://www.youtube.com/@professormesser" },
      { name: "Subnet Practice", link: "https://subnetipv4.com" },
      { name: "Computer Networking PDF (Kurose & Ross)", link: "https://gaia.cs.umass.edu/kurose_ross/index.php" }
    ]
  },
  Tuesday: {
    tasks: [
      "Linux Commands Practice",
      "Kali Linux Hands-on",
      "Document Learning"
    ],
    resources: [
      { name: "Linux Journey", link: "https://linuxjourney.com" },
      { name: "Kali Linux Official", link: "https://www.kali.org" },
      { name: "OverTheWire Bandit", link: "https://overthewire.org/wargames/bandit/" }
    ]
  },
  Wednesday: {
    tasks: [
      "TryHackMe Practice",
      "GitHub Writeup"
    ],
    resources: [
      { name: "TryHackMe", link: "https://tryhackme.com" },
      { name: "GitHub Docs", link: "https://docs.github.com" }
    ]
  },
  Thursday: {
    tasks: [
      "Nmap Theory",
      "Local Lab Scanning",
      "OWASP Study"
    ],
    resources: [
      { name: "Nmap Official Book", link: "https://nmap.org/book/" },
      { name: "OWASP Top 10", link: "https://owasp.org/www-project-top-ten/" },
      { name: "PortSwigger Web Security Academy", link: "https://portswigger.net/web-security" }
    ]
  },
  Friday: {
    tasks: [
      "Cybersecurity Lecture",
      "Wireshark Practice",
      "Weekly Revision"
    ],
    resources: [
      { name: "Wireshark Official", link: "https://www.wireshark.org" },
      { name: "The Cyber Mentor YouTube", link: "https://www.youtube.com/@TCMSecurityAcademy" }
    ]
  },
  Saturday: {
    tasks: ["HackTheBox / TryHackMe Deep Practice (3 hrs)"],
    resources: [
      { name: "Hack The Box", link: "https://www.hackthebox.com" }
    ]
  },
  Sunday: {
    tasks: ["Weekly Revision", "Mini Project Work"],
    resources: [
      { name: "Python Official Docs", link: "https://docs.python.org/3/" },
      { name: "Real Python", link: "https://realpython.com" }
    ]
  }
};

export default function CyberSecurityTracker() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("cyberProgress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cyberProgress", JSON.stringify(progress));
  }, [progress]);

  const toggleTask = (day, task) => {
    setProgress((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [task]: !prev[day]?.[task]
      }
    }));
  };

  const calculateCompletion = () => {
    let total = 0;
    let completed = 0;
    Object.keys(scheduleTemplate).forEach((day) => {
      scheduleTemplate[day].tasks.forEach((task) => {
        total++;
        if (progress[day]?.[task]) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          4-Week Cybersecurity Discipline Tracker
        </motion.h1>

        <Card className="mb-6 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-black h-4 rounded-full"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
            <p className="mt-2 font-medium">{calculateCompletion()}% Completed</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(scheduleTemplate).map((day) => (
            <Card key={day} className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{day}</h2>

                <div className="space-y-3 mb-4">
                  {scheduleTemplate[day].tasks.map((task) => (
                    <div key={task} className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          progress[day]?.[task] ? "line-through" : ""
                        }`}
                      >
                        {task}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => toggleTask(day, task)}
                        className="rounded-xl"
                      >
                        {progress[day]?.[task] ? "Undo" : "Done"}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <h3 className="text-sm font-semibold mb-2">Study Resources</h3>
                  <ul className="text-sm space-y-1">
                    {scheduleTemplate[day].resources.map((res) => (
                      <li key={res.link}>
                        <a
                          href={res.link}
                          target="_blank"
                          className="underline"
                        >
                          {res.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
