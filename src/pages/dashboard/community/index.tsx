'use client'
import DashboardLayout from "@/layouts/DashboardLayout";
import { useState } from 'react'
import { Book, MessageSquare, ThumbsUp, Star, Award, X, ArrowLeft, Flag, FileText, Globe, Plus, MessageCircle, StarOff, StarIcon, ThumbsUpIcon } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Achievements from "@/components/Achievements";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

// Mock data (in a real application, this would come from an API)
const guides = [
    { id: 1, title: 'Getting Started with HttPete', content: '# Getting Started with HttPete\n\nWelcome to HttPete! This guide will walk you through the basics of using our platform for API testing and documentation.\n\n## Setting up your first project\n\n1. Log in to your HttPete account\n2. Click on "New Project" in the dashboard\n3. Give your project a name and description\n4. Start adding API endpoints\n\n## Creating your first API test\n\n1. In your project, click "New Test"\n2. Enter the API endpoint URL\n3. Select the HTTP method (GET, POST, etc.)\n4. Add any necessary headers or parameters\n5. Click "Send" to run the test\n\n## Documenting your API\n\n1. After running a successful test, click "Generate Docs"\n2. HttPete will automatically create a documentation template\n3. Edit the generated content to add more details\n4. Use markdown to format your documentation\n\nCongratulations! You\'ve now created your first API test and documentation in HttPete. Explore more features to get the most out of our platform.' },
    { id: 2, title: 'Advanced API Testing Techniques', content: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!' },
]

const feedPosts = [
    {
        id: 1,
        title: 'How to handle OAuth 2.0 in HttPete?',
        author: 'Alice',
        content: "I'm trying to test an API that uses OAuth 2.0 for authentication. Can someone guide me on how to set this up in HttPete?",
        replies: 5,
        category: 'Authentication',
        comments: [
            {
                id: 1,
                author: 'Bob',
                content: "Here's how you can handle OAuth 2.0 in HttPete:\n\n1. Go to the Authorization tab in your request\n2. Select 'OAuth 2.0' from the Type dropdown\n3. Fill in the required fields (Client ID, Client Secret, etc.)\n4. Click on 'Get New Access Token'\n5. Once you receive the token, HttPete will automatically use it for your request\n\nLet me know if you need more details!",
                stars: 3,
                replies: [
                    {
                        id: 101,
                        author: 'Alice',
                        content: "Thanks Bob! This is really helpful. Do I need to set up a callback URL for this to work?",
                        stars: 1,
                    },
                    {
                        id: 102,
                        author: 'Bob',
                        content: "Good question, Alice! Yes, you typically need to set up a callback URL. This is where the OAuth provider will redirect after the user authenticates. In HttPete, you can use `https://oauth.pstmn.io/v1/callback` as a default callback URL for testing purposes.",
                        stars: 2,
                    }
                ]
            },
            {
                id: 2,
                author: 'Charlie',
                content: "Adding to Bob's answer, make sure you also set up the correct scopes for your OAuth request. This is usually specified in the API documentation of the service you're trying to access.",
                stars: 2,
                replies: []
            },
        ]
    },
    {
        id: 2,
        title: 'Best practices for API versioning',
        author: 'Bob',
        content: "I'm designing a new API and I'm not sure about the best way to handle versioning. What are some best practices you all follow?",
        replies: 3,
        category: 'Best Practices',
        comments: [
            {
                id: 1,
                author: 'David',
                content: "There are a few common approaches to API versioning:\n\n1. URL versioning: /api/v1/resource\n2. Header versioning: Custom header like 'API-Version: 1'\n3. Accept header versioning: 'Accept: application/vnd.company.api+json;version=1'\n\nPersonally, I prefer URL versioning as it's the most straightforward for clients to use.",
                stars: 4,
                replies: []
            },
            {
                id: 2,
                author: 'Eve',
                content: "I agree with David on URL versioning being straightforward. However, if you want to keep your URLs clean, header versioning can be a good alternative. It really depends on your specific use case and target audience.",
                stars: 2,
                replies: []
            },
        ]
    },
]

const forumPosts = [
    {
        id: 1,
        title: 'How to handle OAuth 2.0 in HttPete?',
        author: 'Alice',
        content: "I'm trying to test an API that uses OAuth 2.0 for authentication. Can someone guide me on how to set this up in HttPete?",
        replies: 5,
        category: 'Authentication',
        comments: [
            {
                id: 1,
                author: 'Bob',
                content: "Here's how you can handle OAuth 2.0 in HttPete:\n\n1. Go to the Authorization tab in your request\n2. Select 'OAuth 2.0' from the Type dropdown\n3. Fill in the required fields (Client ID, Client Secret, etc.)\n4. Click on 'Get New Access Token'\n5. Once you receive the token, HttPete will automatically use it for your request\n\nLet me know if you need more details!",
                stars: 3,
                replies: [
                    {
                        id: 101,
                        author: 'Alice',
                        content: "Thanks Bob! This is really helpful. Do I need to set up a callback URL for this to work?",
                        stars: 1,
                    },
                    {
                        id: 102,
                        author: 'Bob',
                        content: "Good question, Alice! Yes, you typically need to set up a callback URL. This is where the OAuth provider will redirect after the user authenticates. In HttPete, you can use `https://oauth.pstmn.io/v1/callback` as a default callback URL for testing purposes.",
                        stars: 2,
                    }
                ]
            },
            {
                id: 2,
                author: 'Charlie',
                content: "Adding to Bob's answer, make sure you also set up the correct scopes for your OAuth request. This is usually specified in the API documentation of the service you're trying to access.",
                stars: 2,
                replies: []
            },
        ]
    },
    {
        id: 2,
        title: 'Best practices for API versioning',
        author: 'Bob',
        content: "I'm designing a new API and I'm not sure about the best way to handle versioning. What are some best practices you all follow?",
        replies: 3,
        category: 'Best Practices',
        comments: [
            {
                id: 1,
                author: 'David',
                content: "There are a few common approaches to API versioning:\n\n1. URL versioning: /api/v1/resource\n2. Header versioning: Custom header like 'API-Version: 1'\n3. Accept header versioning: 'Accept: application/vnd.company.api+json;version=1'\n\nPersonally, I prefer URL versioning as it's the most straightforward for clients to use.",
                stars: 4,
                replies: []
            },
            {
                id: 2,
                author: 'Eve',
                content: "I agree with David on URL versioning being straightforward. However, if you want to keep your URLs clean, header versioning can be a good alternative. It really depends on your specific use case and target audience.",
                stars: 2,
                replies: []
            },
        ]
    },
]

const featureRequests = [
    {
        id: 1,
        title: 'Add support for GraphQL APIs',
        author: 'Alice',
        description: 'As GraphQL is becoming more popular, it would be great to have native support for testing GraphQL APIs in HttPete. This could include features like schema introspection, query builder, and specific GraphQL assertions.',
        votes: 42,
        status: 'Under Review',
        comments: [
            {
                id: 1,
                author: 'Bob',
                content: 'This would be amazing! I\'m working more and more with GraphQL APIs and having native support in HttPete would save me a lot of time.',
                votes: 5,
                replies: []
            },
            {
                id: 2,
                author: 'Charlie',
                content: 'Agreed! It would also be great if we could have some kind of visual query builder for GraphQL, similar to what some other tools offer.',
                votes: 3,
                replies: [
                    {
                        id: 101,
                        author: 'Alice',
                        content: 'That\'s a great idea, Charlie! A visual query builder would make it so much easier to construct complex queries.',
                        votes: 2,
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: 'Implement real-time collaboration',
        author: 'David',
        description: 'It would be fantastic if we could collaborate on API testing in real-time, similar to how Google Docs works. This would make it easier for teams to work together on complex API scenarios.',
        votes: 38,
        status: 'Planned',
        comments: []
    },
    {
        id: 3,
        title: 'Create a mobile app for HttPete',
        author: 'Eve',
        description: 'A mobile app for HttPete would allow us to monitor our API tests on the go. It could send push notifications for failed tests and allow us to quickly run tests from our phones.',
        votes: 25,
        status: 'Considering',
        comments: []
    },
]

const popularPosts = [
    { id: 1, title: 'Top 10 API Security Best Practices', type: 'Article', author: 'Alice', authorFlair: 'API Expert', content: "# Top 10 API Security Best Practices\n\n1. Use HTTPS\n2. Implement proper authentication\n3. Use OAuth for authorization\n4. Implement rate limiting\n5. Validate and sanitize all inputs\n6. Use parameterized queries to prevent SQL injection\n7. Implement proper error handling\n8. Use API keys for identification\n9. Keep your dependencies up to date\n10. Regularly perform security audits\n\nFollowing these practices will significantly improve the security of your APIs!" },
    { id: 2, title: 'How I automated my entire workflow with HttPete', type: 'Discussion', author: 'Bob', authorFlair: 'Power User', content: "# How I automated my entire workflow with HttPete\n\nAs a backend developer, I was spending a lot of time manually testing and documenting APIs. Here's how I used HttPete to automate my workflow:\n\n1. Created a collection for each microservice\n2. Set up environment variables for different stages (dev, staging, prod)\n3. Wrote pre-request scripts to handle authentication\n4. Used test scripts to automate assertions\n5. Set up monitors to run tests periodically\n6. Used the documentation generation feature to keep docs up-to-date\n\nNow, whenever I make changes, I just run my HttPete collection, and it takes care of testing and updating the documentation. It's been a huge time-saver!" },
    { id: 3, title: 'HttPete v2.0 Feature Walkthrough', type: 'Video', author: 'Charlie', authorFlair: 'Moderator', content: "# HttPete v2.0 Feature Walkthrough\n\nCheck out our latest video on YouTube for a complete walkthrough of the new features in HttPete v2.0:\n\n- Improved UI for easier navigation\n- Advanced scripting capabilities\n- Built-in mock server functionality\n- Enhanced collaboration features\n- AI-powered test generation\n\n[Watch the video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\nLet us know what you think of the new features in the comments!" },
]

export default function CommunityPage() {
    const [modalContent, setModalContent] = useState<null | { type: string; content: any }>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const openGuideModal = (guide: typeof guides[0]) => {
        setModalContent({ type: 'guide', content: guide })
    }

    const openPopularPostsModal = () => {
        setModalContent({ type: 'popularPosts', content: popularPosts })
    }

    const openPopularPostModal = (post: typeof popularPosts[0]) => {
        setModalContent({ type: 'popularPost', content: post })
    }

    const openForumPostModal = (post: typeof forumPosts[0]) => {
        setModalContent({ type: 'forumPost', content: post })
    }

    const openAllDiscussionsModal = () => {
        setModalContent({ type: 'allDiscussions', content: forumPosts })
    }

    const openAllFeatureRequestsModal = () => {
        setModalContent({ type: 'allFeatureRequests', content: featureRequests })
    }

    const openFeatureRequestModal = (feature: typeof featureRequests[0]) => {
        setModalContent({ type: 'featureRequest', content: feature })
    }

    const openNewDiscussionModal = () => {
        setModalContent({ type: 'newDiscussion', content: null })
    }

    const openNewFeatureRequestModal = () => {
        setModalContent({ type: 'newFeatureRequest', content: null })
    }

    const closeModal = () => {
        setModalContent(null)
    }

    const renderComments = (comments: any[], parentId: number | null = null, depth = 0) => {
        return comments
            .filter(comment => (parentId === null && !comment.parentId) || comment.parentId === parentId)
            .map(comment => (
                <div key={comment?.id} className={`bg-gray-700 p-4 rounded-lg ${depth > 0 ? 'ml-4 mt-2' : 'mt-4'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        <div className="flex items-center space-x-2">
                            <button className="text-yellow-500 hover:text-yellow-400 transition duration-300">
                                <Star className="w-5 h-5" />
                            </button>
                            <span>{comment.stars || comment.votes}</span>
                            <button className="text-red-500 hover:text-red-400 transition duration-300">
                                <Flag className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <ReactMarkdown className="prose prose-invert max-w-none">{comment.content}</ReactMarkdown>
                    {comment.replies && renderComments(comment.replies, comment?.id, depth + 1)}
                    <button className="mt-2 text-sm text-red-500 hover:text-red-400 transition duration-300">Reply</button>
                </div>
            ))
    }

    return (
        <DashboardLayout sidebarType='none'>
            
        <main className="min-h-screen bg-gray-900 text-gray-100">
            <div className="flex items-start justify-center mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-12">
                <div className="grid grid-cols-4 gap-8">
                    <div className="lg:col-span-1">

                        {/* Guides */}
                        <section className="mb-12">

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Guides</h2>
                            </div>
                            <p className="text-gray-400 mb-4">This section contains curated content created by administrators or recognized community contributions.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {guides.map((guide) => (
                                    <button
                                        key={guide?.id}
                                        onClick={() => openGuideModal(guide)}
                                        className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300 text-left"
                                    >
                                        <div className="flex items-center">
                                            <Book className="w-6 h-6 text-red-500 mr-2" />
                                            <span>{guide.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Forum Discussions */}
                        <section className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Forum Discussions</h2>
                                <button
                                    onClick={openNewDiscussionModal}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Discussion
                                </button>
                            </div>
                            <div className="space-y-4">
                                {forumPosts.map((post) => (
                                    <div key={post?.id} className="bg-gray-800 p-4 rounded-lg">
                                        <button
                                            onClick={() => openForumPostModal(post)}
                                            className="text-lg font-semibold hover:text-red-500 transition duration-300 text-left"
                                        >
                                            {post.title}
                                        </button>
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <span>{post.author}</span>
                                            <MessageSquare className="w-4 h-4 ml-4 mr-1" />
                                            <span>{post.replies} replies</span>
                                            <span className="ml-4 bg-gray-700 px-2 py-1 rounded-full text-xs">{post.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={openAllDiscussionsModal}
                                className="inline-block mt-4 text-red-500 hover:underline"
                            >
                                View all discussions
                            </button>
                        </section>

                        {/* Feature Requests */}
                        <section className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Feature Requests</h2>
                                <button
                                    onClick={openNewFeatureRequestModal}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Feature Request
                                </button>
                            </div>
                            <div className="space-y-4">
                                {featureRequests.map((feature) => (
                                    <div key={feature?.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                                        <div>
                                            <button
                                                onClick={() => openFeatureRequestModal(feature)}
                                                className="text-lg font-semibold hover:text-red-500 transition duration-300 text-left"
                                            >
                                                {feature.title}
                                            </button>
                                            <div className="text-sm text-gray-400 mt-1">Status: {feature.status}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <ThumbsUp className="w-4 h-4 mr-1 text-red-500" />
                                            <span>{feature.votes}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={openAllFeatureRequestsModal}
                                className="inline-block mt-4 text-red-500 hover:underline"
                            >
                                View all feature requests
                            </button>
                        </section>
                    </div>

                    <div className='lg:col-span-2'>
                        <h1 className='ml-8'>Feed</h1>
                        <div className='flex flex-row-reverse mr-8 -mt-12'>

                        <select className='p-1 bg-slate-700 text-white'>
                            <option>Most Popular</option>
                            <option>Most Recent</option>
                            <option>Most Controversial</option>
                        </select>
                        <span className='m-2'>Sort by</span>

                        <select className='p-1 bg-slate-700 text-white'>
                            <option>General Discussion</option>
                            <option>Guides and Tutorials</option>
                            <option>Programming</option>
                            <option>DevOps</option>
                            <option>Resources</option>
                            <option>Job Postings</option>
                        </select>
                        <span className='m-2'>Categories</span>
                        </div>
                        {feedPosts.map(x =>
                            <>
                                <Card className='bg-gray-800 p-2 m-8 text-white border-slate-600'>
                                    <CardHeader>
                                        <h1 className='font-normal'> {x.title}</h1>
                                        <p className='font-normal'>
                                            <span className='text-red-400 font-bold'>{x.author}</span> on {" "}
                                            <span className='text-red-400 font-bold'>{x.category}</span>
                                        </p>
                                    </CardHeader>
                                    <CardContent>{x.content}</CardContent>
                                    <CardFooter>
                                        <div className='flex flex-col w-full'>
                                            {x.comments.map(comment => 
                                                <div className='p-4 bg-gray-700 m-4 rounded-lg'>
                                                        <ThumbsUpIcon fill='transparent' color='white' className='p-1 size-10 ml-auto' style={{marginBottom:'-3rem'}}/>
                                                    <p className='text-cyan-300 p-2 text-xl'>{comment.author}</p>
                                                    <div className='ml-2 mt-2' style={{maxWidth:'92.5%'}}>
                                                        <ReactMarkdown>{comment.content}</ReactMarkdown>
                                                    </div>
                                                    <div className='flex gap-2 text-gray-400 text-md font-normal w-fit ml-auto hover:cursor-pointer hover:text-red-400'>
                                                        Reply
                                                    </div>
                                                </div>
                                            )}
                                            <Separator className='mt-8 mb-4'/>
                                            <p className='mb-4'>Leave a comment</p>
                                        <textarea className='bg-gray-700 rounded-lg text-white' style={{height: '150px'}}/>
                                        <Button className='m-2 w-1/4 ml-auto'><MessageCircle/> Comment </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </>
                        )}
                    </div>
                    <div className='lg:col-span-1'>
                        <section className="bg-gray-800 p-6 rounded-lg mb-8">
                            <button
                                onClick={openPopularPostsModal}
                                className="text-2xl font-bold mb-4 hover:text-red-500 transition duration-300"
                            >
                                Popular Now
                            </button>
                            <div className="space-y-4">
                                {popularPosts.slice(0, 3).map((post) => (
                                    <div key={post?.id} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                                        <button
                                            onClick={() => openPopularPostModal(post)}
                                            className="text-lg font-semibold hover:text-red-500 transition duration-300 text-left"
                                        >
                                            {post.title}
                                        </button>
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <span className="bg-gray-700 px-2 py-1 rounded-full text-xs mr-2">{post.type}</span>
                                            <span>{post.author}</span>
                                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                                                <Star className="w-3 h-3 mr-1" />
                                                {post.authorFlair}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={openPopularPostsModal}
                                className="mt-4 text-red-500 hover:underline"
                            >
                                See more
                            </button>
                        </section>
                        <section className="bg-gray-800 p-6 rounded-lg">
                            <Achievements expanded={false} />
                        </section>
                    </div>
                </div>
            </div>

            {modalContent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">
                                    {modalContent.type === 'guide' && modalContent.content.title}
                                    {modalContent.type === 'popularPosts' && 'Popular Posts'}
                                    {modalContent.type === 'popularPost' && modalContent.content.title}
                                    {modalContent.type === 'forumPost' && modalContent.content.title}
                                    {modalContent.type === 'allDiscussions' && 'All Discussions'}
                                    {modalContent.type === 'allFeatureRequests' && 'All Feature Requests'}
                                    {modalContent.type === 'featureRequest' && modalContent.content.title}
                                    {modalContent.type === 'newDiscussion' && 'New Discussion'}
                                    {modalContent.type === 'newFeatureRequest' && 'New Feature Request'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-500 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {modalContent.type === 'guide' && (
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown>{modalContent.content.content}</ReactMarkdown>
                                </div>
                            )}

                            {modalContent.type === 'popularPosts' && (
                                <div className="space-y-4">
                                    {modalContent.content.map((post: typeof popularPosts[0]) => (
                                        <button
                                            key={post?.id}
                                            onClick={() => openPopularPostModal(post)}
                                            className="block w-full text-left p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
                                        >
                                            <h3 className="text-lg font-semibold">{post.title}</h3>
                                            <div className="flex items-center mt-2 text-sm text-gray-400">
                                                <span className="bg-gray-600 px-2 py-1 rounded-full text-xs mr-2">{post.type}</span>
                                                <span>{post.author}</span>
                                                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                                                    <Star className="w-3 h-3 mr-1" />
                                                    {post.authorFlair}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {modalContent.type === 'popularPost' && (
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown>{modalContent.content.content}</ReactMarkdown>
                                </div>
                            )}

                            {modalContent.type === 'forumPost' && (
                                <div className="space-y-6">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">{modalContent.content.author}</span>
                                            <span className="text-sm text-gray-400">Original Post</span>
                                        </div>
                                        <p>{modalContent.content.content}</p>
                                    </div>
                                    <h3 className="text-xl font-semibold mt-6 mb-4">Comments</h3>
                                    {renderComments(modalContent.content.comments)}
                                </div>
                            )}

                            {modalContent.type === 'allDiscussions' && (
                                <div className="space-y-4">
                                    {modalContent.content.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((post: typeof forumPosts[0]) => (
                                        <div key={post?.id} className="bg-gray-700 p-4 rounded-lg">
                                            <button
                                                onClick={() => openForumPostModal(post)}
                                                className="text-lg font-semibold hover:text-red-500 transition duration-300 text-left"
                                            >
                                                {post.title}
                                            </button>
                                            <div className="flex items-center mt-2 text-sm text-gray-400">
                                                <span>{post.author}</span>
                                                <MessageSquare className="w-4 h-4 ml-4 mr-1" />
                                                <span>{post.replies} replies</span>
                                                <span className="ml-4 bg-gray-600 px-2 py-1 rounded-full text-xs">{post.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            disabled={currentPage * itemsPerPage >= modalContent.content.length}
                                            className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {modalContent.type === 'allFeatureRequests' && (
                                <div className="space-y-4">
                                    {modalContent.content.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((feature: typeof featureRequests[0]) => (
                                        <div key={feature?.id} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                                            <div>
                                                <button
                                                    onClick={() => openFeatureRequestModal(feature)}
                                                    className="text-lg font-semibold hover:text-red-500 transition duration-300 text-left"
                                                >
                                                    {feature.title}
                                                </button>
                                                <div className="text-sm text-gray-400 mt-1">Status: {feature.status}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <ThumbsUp className="w-4 h-4 mr-1 text-red-500" />
                                                <span>{feature.votes}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            disabled={currentPage * itemsPerPage >= modalContent.content.length}
                                            className="bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                            {modalContent.type === 'featureRequest' && (
                                <div className="space-y-6">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">{modalContent.content.author}</span>
                                            <div className="flex items-center">
                                                <ThumbsUp className="w-4 h-4 mr-1 text-red-500" />
                                                <span>{modalContent.content.votes}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{modalContent.content.title}</h3>
                                        <p className="text-gray-300 mb-4">{modalContent.content.description}</p>
                                        <div className="flex items-center text-sm text-gray-400">
                                            <span className="bg-gray-600 px-2 py-1 rounded-full">{modalContent.content.status}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">Comments</h4>
                                        {renderComments(modalContent.content.comments)}
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="text-lg font-semibold mb-2">Add a Comment</h4>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            // Here you would handle the comment submission
                                        }}>
                                            <textarea
                                                className="w-full bg-gray-700 text-white rounded-lg p-2 mb-2"
                                                rows={4}
                                                placeholder="Type your comment here..."
                                            ></textarea>
                                            <button
                                                type="submit"
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                            >
                                                Submit Comment
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {modalContent.type === 'newDiscussion' && (
                                <div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        // Here you would handle the new discussion submission
                                    }}>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                                                placeholder="Enter discussion title"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                id="category"
                                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                                            >
                                                <option value="">Select a category</option>
                                                <option value="Authentication">Authentication</option>
                                                <option value="Best Practices">Best Practices</option>
                                                <option value="Troubleshooting">Troubleshooting</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                                            <textarea
                                                id="content"
                                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                                                rows={6}
                                                placeholder="Type your discussion content here..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Create Discussion
                                        </button>
                                    </form>
                                </div>
                            )}

                            {modalContent.type === 'newFeatureRequest' && (
                                <div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        // Here you would handle the new feature request submission
                                    }}>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                                                placeholder="Enter feature request title"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                            <textarea
                                                id="description"
                                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                                                rows={6}
                                                placeholder="Describe the feature you're requesting..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Submit Feature Request
                                        </button>
                                    </form>
                                </div>
                            )}

                            {(modalContent.type === 'popularPosts' || modalContent.type === 'popularPost') && (
                                <button
                                    onClick={() => modalContent.type === 'popularPost' ? openPopularPostsModal() : closeModal()}
                                    className="mt-6 flex items-center text-red-500 hover:text-red-400 transition duration-300"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    {modalContent.type === 'popularPost' ? 'Back to Popular Posts' : 'Close'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>)}
        </main>
        </DashboardLayout>
    )
}
