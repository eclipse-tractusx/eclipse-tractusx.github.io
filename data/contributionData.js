/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import Chat from '@mui/icons-material/Chat';
import Groups from '@mui/icons-material/Groups';
import Add from '@mui/icons-material/Add';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import Code from '@mui/icons-material/Code';
import Description from '@mui/icons-material/Description';
import BugReport from '@mui/icons-material/BugReport';
import Lightbulb from '@mui/icons-material/Lightbulb';
import QuestionIcon from '@mui/icons-material/QuestionMark';
import EventIcon from '@mui/icons-material/Event';

export const contributionOptions = [
  {
    title: "Create a KIT",
    description: "Build and contribute your own KIT to help the community with comprehensive documentation and reference implementations.",
    icon: Add,
    link: "/documentation/kit-getting-started",
    primary: true
  },
  {
    title: "Ask questions about KITs",
    description: "Get help and support from the community by asking questions about KITs on our Matrix channel.",
    icon: QuestionIcon,
    link: "https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org",
    primary: false
  },
  {
    title: "Join Community Discussions",
    description: "Participate in our community office hours and help shape the future of dataspace technology.",
    icon: Groups,
    link: "/community/open-meetings",
    primary: false
  },
  {
    title: "Chat with Developers",
    description: "Chat with us at our main Eclipse Tractus-X Matrix channel (a open source chat service), and become one of us!",
    icon: Chat,
    link: "https://chat.eclipse.org/#/room/#tractusx:matrix.eclipse.org",
    primary: false
  },
  {
    title: "Get Started",
    description: "New to Eclipse Tractus-X? Follow our getting started guide to learn how to contribute.",
    icon: RocketLaunch,
    link: "https://eclipse-tractusx.github.io/docs/getting-started/",
    primary: false
  },
  {
    title: "Contribute Code",
    description: "Help improve existing free and open source software (FOSS) by contributing code, fixes, and enhancements to our repositories.",
    icon: Code,
    link: "https://github.com/eclipse-tractusx",
    primary: false
  },
  {
    title: "Learn and Improve Documentation",
    description: "Help make the content of the KITs better by fixing errors, adding examples and diagrams, or improving clarity.",
    icon: Description,
    link: "/documentation/kit-framework",
    primary: false
  },
  {
    title: "Report Issues",
    description: "Found a bug or issue? Report it to help us improve the quality of our KITs and reference implementations.",
    icon: BugReport,
    link: "https://github.com/eclipse-tractusx/sig-release/issues",
    primary: false
  },
  {
    title: "Share Ideas",
    description: "Have an idea for a new KIT or improvement? Share it with the community and start a discussion.",
    icon: Lightbulb,
    link: "https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/discussions/categories/kits",
    primary: false
  },
  {
    title: "Join our Community Days",
    description: "Participate in our community days to learn, collaborate and share ideas with others.",
    icon: EventIcon,
    link: "/blog/community-days-12-2025",
    primary: false
  }
];
