'use client'
import React, { useState } from 'react';
import {
    Activity, AirVent, Airplay, AlarmCheck, AlarmClock, AlarmClockOff, AlarmMinus, AlarmPlus, Album, AlertCircle, AlertOctagon,
        AlertTriangle, AlignCenter, AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical,
        AlignHorizontalDistributeCenter, AlignHorizontalDistributeEnd, AlignHorizontalDistributeStart, AlignHorizontalJustifyCenter,
        AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween,
        AlignJustify, AlignLeft, AlignRight, AlignStartHorizontal, AlignStartVertical, AlignVerticalDistributeCenter,
        AlignVerticalDistributeEnd, AlignVerticalDistributeStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
        AlignVerticalJustifyStart, AlignVerticalSpaceAround, AlignVerticalSpaceBetween, Anchor, Angry, Aperture, AppWindow,
        Apple, Archive, ArchiveRestore, ArchiveX, AreaChart, Armchair, ArrowBigDown, ArrowBigDownDash, ArrowBigLeft,
        ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash, ArrowBigUp, ArrowBigUpDash, ArrowDown, ArrowDownCircle, ArrowDownLeft,
        ArrowDownRight, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft,
        ArrowUpRight, Asterisk, AtSign, Award, Axe, Backpack, BaggageClaim, Ban,  Banknote, BarChart, BarChart2,
        BarChart3, BarChart4, BarChartHorizontal, Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Beaker,
        Bell, BellMinus, BellOff, BellPlus, BellRing, Bike, Binary, Bitcoin, Bluetooth, BluetoothConnected, BluetoothOff,
        BluetoothSearching, Bold, Bomb, Bone, Book, BookOpen, Bookmark, BookmarkMinus, BookmarkPlus, Bot, Box, BoxSelect,
        Boxes, Briefcase, Brush, Bug, Building, Building2, Bus, Cake, Calculator, Calendar, Camera, CameraOff, Car, Carrot,
        Cast, Check, CheckCircle, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown,
        ChevronsLeft, ChevronsRight, ChevronsUp, Circle, CircleSlashed, Clipboard, ClipboardCheck,
        ClipboardCopy, ClipboardList, ClipboardX, Clock, Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning,
        CloudMoon, CloudOff, CloudRain, CloudRainWind, CloudSnow, CloudSun, Cloudy, Clover, Code, Code2, Codepen,
        Coffee, Coins, Columns, Command, Compass, Contact, Contrast, Copy, Copyleft, Copyright, CornerDownLeft,
        CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu,
        CreditCard, Croissant, Crop, Cross, Crosshair, Crown, Database, Delete, Disc, Divide, DivideCircle, DivideSquare,
        DollarSign, Download, DownloadCloud, Droplet, Droplets, Edit, Edit2, Edit3, Egg, Equal, EqualNot,
        Eraser, Euro, Expand, ExternalLink, Eye, EyeOff, FastForward, Feather, File, FileCheck,
        FileCheck2, FileCode, FileDigit, FileInput, FileMinus, FileOutput, FilePlus, FileSearch, FileText, FileX,
        Files, Film, Filter, Fingerprint, Flag, FlagOff,  FlipHorizontal, FlipVertical, Folder, FolderArchive,
        FolderCheck, FolderClock, FolderClosed, FolderCog, FolderCog2, FolderDown, FolderEdit, FolderHeart, FolderInput,
        FolderLock, FolderMinus, FolderOpen, FolderOutput, FolderPlus, FolderSearch, FolderX, Folders, Footprints,
        Forklift, FormInput, Forward, Frame, Frown, Fuel, FunctionSquare, Gamepad, Gauge, Gavel, Gem, Ghost,
        Gift, GitBranch, GitBranchPlus, GitCommit, GitCompare, GitFork, GitMerge, GitPullRequest, GitPullRequestClosed,
        GitPullRequestDraft, GlassWater, Glasses, Globe, Globe2, Grab, GraduationCap, Grid, Grip,
        GripHorizontal, GripVertical, Hammer, Hand, HandMetal, HardDrive, HardHat, Hash, Haze, Headphones, Heart,
        HeartCrack, HeartHandshake, HeartOff, HeartPulse, HelpCircle, Hexagon, Highlighter, History, Home, Image,
        ImageMinus, ImageOff, ImagePlus, Import, Inbox, Indent, IndianRupee, Infinity, Info, Inspect, Instagram,
        Italic, JapaneseYen, Joystick, Key, Keyboard, Landmark, Languages, Laptop, Laptop2, Lasso, Layers,
        Layout, LayoutDashboard, LayoutGrid, LayoutList, LayoutTemplate, Leaf, Library, LifeBuoy, Lightbulb,
        LightbulbOff, Link, Link2, List, ListChecks, ListEnd, ListMinus, ListMusic, ListOrdered,
        ListPlus, ListRestart, ListStart, ListTree, ListVideo, ListX, Loader, Loader2, Locate, LocateFixed,
        LocateOff, Lock, LogIn, LogOut, Luggage, Magnet, Mail, MailCheck, MailMinus, MailOpen, MailPlus,
        MailQuestion, MailSearch, MailWarning, MailX, Mailbox, Mails, Map, MapPin, MapPinOff, 
        Martini, Maximize, Maximize2, Medal, Megaphone, Meh, Menu, MessageCircle, MessageSquare, 
        Mic, Mic2, MicOff, Microscope, Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Monitor,
        MonitorOff, MonitorSpeaker,  Moon, MoreHorizontal, MoreVertical, Mountain, Mouse,
        MousePointer, Move, Move3d, MoveDiagonal, MoveDiagonal2, MoveHorizontal, MoveVertical, Music,
        Music2, Music3,   Network, Newspaper, Octagon, Option, Outdent, Package,
        PackageCheck, PackageMinus, PackageOpen, PackagePlus, PackageSearch, PackageX, Paintbrush,
        Palette, Palmtree, Paperclip, Pause, PauseCircle, PauseOctagon, PenTool, Pencil, Percent,
        PersonStanding, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing,
        Pi, PieChart, PiggyBank, Pin, PinOff, Pipette, Plane, PlaneLanding, PlaneTakeoff, Play, PlayCircle,
        Plug, Plug2, PlugZap, Plus, PlusCircle, PlusSquare, Podcast, Pointer, PoundSterling,
        Power, PowerOff, Printer, Puzzle, QrCode, Quote, Radio, RadioReceiver, RectangleHorizontal,
        RectangleVertical, Repeat, Repeat1, Rewind, Rocket,  Rotate3d, RotateCcw, RotateCw,
        Rss, Ruler,   Save, SaveAll,   Scan,
        ScanFace, ScanLine, Scissors, Share, ScreenShareOff, Scroll, Search, SearchX, Send, SeparatorHorizontal, SeparatorVertical, Server, ServerCog,
        ServerCrash, ServerOff, Settings, Settings2, Shapes, Share2, Sheet, Shield, ShieldAlert, ShieldCheck, ShieldClose,
        ShieldOff, ShieldQuestion, Ship, Shirt, ShoppingBag, ShoppingCart, Shovel, Shrink, Shuffle, Sigma, Signal,
        SignalHigh, SignalLow, SignalMedium, SignalZero, SkipBack, SkipForward, Skull, Slash, Sliders,
        SlidersHorizontal, Smartphone, SmartphoneCharging, Smile, SmilePlus, Snowflake, SortAsc, SortDesc, Speaker,
        SpellCheck, Square, Star, StarHalf, StopCircle, StretchHorizontal, StretchVertical, Strikethrough,
        Subscript, Sun, SunDim, SunSnow, Sunrise, Sunset, Superscript, SwissFranc, SwitchCamera, Sword, Swords,
        Syringe, Table, Tablet, TabletSmartphone, Tag, Tags, Target, Tent, Terminal, TerminalSquare, Text, TextCursor,
        TextCursorInput, TextQuote, TextSelect, Thermometer, ThermometerSnowflake, ThermometerSun, ThumbsDown,
        ThumbsUp, Ticket, Timer, TimerOff, ToggleLeft, ToggleRight, Tornado, Trash, Trash2, TreeDeciduous,
        Triangle, Trophy, Truck, Tv, Tv2, Type, Umbrella, Underline, Undo, Unlink, Unlock, Upload,
        UploadCloud, Usb, User, UserCheck, UserCircle, UserMinus, UserPlus, UserSquare, UserX, Users, Users2, Verified,
        Vibrate, Video, VideoOff, View, Voicemail, Volume, Volume1, Volume2, VolumeX,
        Wallet, Wallpaper, Wand, Wand2, Watch, Waves, Webcam, Webhook, Wheat, Wifi, WifiOff, Wind, Wine, Workflow,
        WrapText, Wrench, X, XCircle, XSquare, Zap, ZapOff, ZoomIn, ZoomOut,
} from 'lucide-react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

type LucideSelectorProps = {
    onChange: (icon: string) => void;
    value: string;
}
const LucideSelector = (props: LucideSelectorProps) => {
    // Create an array of icon names and their components
    const iconComponents = {
        Activity, AirVent, Airplay, AlarmCheck, AlarmClock, AlarmClockOff, AlarmMinus, AlarmPlus, Album, AlertCircle, AlertOctagon,
        AlertTriangle, AlignCenter, AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical,
        AlignHorizontalDistributeCenter, AlignHorizontalDistributeEnd, AlignHorizontalDistributeStart, AlignHorizontalJustifyCenter,
        AlignHorizontalJustifyEnd, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween,
        AlignJustify, AlignLeft, AlignRight, AlignStartHorizontal, AlignStartVertical, AlignVerticalDistributeCenter,
        AlignVerticalDistributeEnd, AlignVerticalDistributeStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
        AlignVerticalJustifyStart, AlignVerticalSpaceAround, AlignVerticalSpaceBetween, Anchor, Angry, Aperture, AppWindow,
        Apple, Archive, ArchiveRestore, ArchiveX, AreaChart, Armchair, ArrowBigDown, ArrowBigDownDash, ArrowBigLeft,
        ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash, ArrowBigUp, ArrowBigUpDash, ArrowDown, ArrowDownCircle, ArrowDownLeft,
        ArrowDownRight, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft,
        ArrowUpRight, Asterisk, AtSign, Award, Axe, Backpack, BaggageClaim, Ban,  Banknote, BarChart, BarChart2,
        BarChart3, BarChart4, BarChartHorizontal, Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Beaker,
        Bell, BellMinus, BellOff, BellPlus, BellRing, Bike, Binary, Bitcoin, Bluetooth, BluetoothConnected, BluetoothOff,
        BluetoothSearching, Bold, Bomb, Bone, Book, BookOpen, Bookmark, BookmarkMinus, BookmarkPlus, Bot, Box, BoxSelect,
        Boxes, Briefcase, Brush, Bug, Building, Building2, Bus, Cake, Calculator, Calendar, Camera, CameraOff, Car, Carrot,
        Cast, Check, CheckCircle, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown,
        ChevronsLeft, ChevronsRight, ChevronsUp, Circle, CircleSlashed, Clipboard, ClipboardCheck,
        ClipboardCopy, ClipboardList, ClipboardX, Clock, Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning,
        CloudMoon, CloudOff, CloudRain, CloudRainWind, CloudSnow, CloudSun, Cloudy, Clover, Code, Code2, Codepen,
        Coffee, Coins, Columns, Command, Compass, Contact, Contrast, Copy, Copyleft, Copyright, CornerDownLeft,
        CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu,
        CreditCard, Croissant, Crop, Cross, Crosshair, Crown, Database, Delete, Disc, Divide, DivideCircle, DivideSquare,
        DollarSign, Download, DownloadCloud, Droplet, Droplets, Edit, Edit2, Edit3, Egg, Equal, EqualNot,
        Eraser, Euro, Expand, ExternalLink, Eye, EyeOff, FastForward, Feather, File, FileCheck,
        FileCheck2, FileCode, FileDigit, FileInput, FileMinus, FileOutput, FilePlus, FileSearch, FileText, FileX,
        Files, Film, Filter, Fingerprint, Flag, FlagOff,  FlipHorizontal, FlipVertical, Folder, FolderArchive,
        FolderCheck, FolderClock, FolderClosed, FolderCog, FolderCog2, FolderDown, FolderEdit, FolderHeart, FolderInput,
        FolderLock, FolderMinus, FolderOpen, FolderOutput, FolderPlus, FolderSearch, FolderX, Folders, Footprints,
        Forklift, FormInput, Forward, Frame, Frown, Fuel, FunctionSquare, Gamepad, Gauge, Gavel, Gem, Ghost,
        Gift, GitBranch, GitBranchPlus, GitCommit, GitCompare, GitFork, GitMerge, GitPullRequest, GitPullRequestClosed,
        GitPullRequestDraft, GlassWater, Glasses, Globe, Globe2, Grab, GraduationCap, Grid, Grip,
        GripHorizontal, GripVertical, Hammer, Hand, HandMetal, HardDrive, HardHat, Hash, Haze, Headphones, Heart,
        HeartCrack, HeartHandshake, HeartOff, HeartPulse, HelpCircle, Hexagon, Highlighter, History, Home, Image,
        ImageMinus, ImageOff, ImagePlus, Import, Inbox, Indent, IndianRupee, Infinity, Info, Inspect, Instagram,
        Italic, JapaneseYen, Joystick, Key, Keyboard, Landmark, Languages, Laptop, Laptop2, Lasso, Layers,
        Layout, LayoutDashboard, LayoutGrid, LayoutList, LayoutTemplate, Leaf, Library, LifeBuoy, Lightbulb,
        LightbulbOff, Link, Link2, List, ListChecks, ListEnd, ListMinus, ListMusic, ListOrdered,
        ListPlus, ListRestart, ListStart, ListTree, ListVideo, ListX, Loader, Loader2, Locate, LocateFixed,
        LocateOff, Lock, LogIn, LogOut, Luggage, Magnet, Mail, MailCheck, MailMinus, MailOpen, MailPlus,
        MailQuestion, MailSearch, MailWarning, MailX, Mailbox, Mails, Map, MapPin, MapPinOff, 
        Martini, Maximize, Maximize2, Medal, Megaphone, Meh, Menu, MessageCircle, MessageSquare, 
        Mic, Mic2, MicOff, Microscope, Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Monitor,
        MonitorOff, MonitorSpeaker,  Moon, MoreHorizontal, MoreVertical, Mountain, Mouse,
        MousePointer, Move, Move3d, MoveDiagonal, MoveDiagonal2, MoveHorizontal, MoveVertical, Music,
        Music2, Music3,   Network, Newspaper, Octagon, Option, Outdent, Package,
        PackageCheck, PackageMinus, PackageOpen, PackagePlus, PackageSearch, PackageX, Paintbrush,
        Palette, Palmtree, Paperclip, Pause, PauseCircle, PauseOctagon, PenTool, Pencil, Percent,
        PersonStanding, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing,
        Pi, PieChart, PiggyBank, Pin, PinOff, Pipette, Plane, PlaneLanding, PlaneTakeoff, Play, PlayCircle,
        Plug, Plug2, PlugZap, Plus, PlusCircle, PlusSquare, Podcast, Pointer, PoundSterling,
        Power, PowerOff, Printer, Puzzle, QrCode, Quote, Radio, RadioReceiver, RectangleHorizontal,
        RectangleVertical, Repeat, Repeat1, Rewind, Rocket,  Rotate3d, RotateCcw, RotateCw,
        Rss, Ruler,   Save, SaveAll,   Scan,
        ScanFace, ScanLine, Scissors, Share, ScreenShareOff, Scroll, Search, SearchX, Send, SeparatorHorizontal, SeparatorVertical, Server, ServerCog,
        ServerCrash, ServerOff, Settings, Settings2, Shapes, Share2, Sheet, Shield, ShieldAlert, ShieldCheck, ShieldClose,
        ShieldOff, ShieldQuestion, Ship, Shirt, ShoppingBag, ShoppingCart, Shovel, Shrink, Shuffle, Sigma, Signal,
        SignalHigh, SignalLow, SignalMedium, SignalZero, SkipBack, SkipForward, Skull, Slash, Sliders,
        SlidersHorizontal, Smartphone, SmartphoneCharging, Smile, SmilePlus, Snowflake, SortAsc, SortDesc, Speaker,
        SpellCheck, Square, Star, StarHalf, StopCircle, StretchHorizontal, StretchVertical, Strikethrough,
        Subscript, Sun, SunDim, SunSnow, Sunrise, Sunset, Superscript, SwissFranc, SwitchCamera, Sword, Swords,
        Syringe, Table, Tablet, TabletSmartphone, Tag, Tags, Target, Tent, Terminal, TerminalSquare, Text, TextCursor,
        TextCursorInput, TextQuote, TextSelect, Thermometer, ThermometerSnowflake, ThermometerSun, ThumbsDown,
        ThumbsUp, Ticket, Timer, TimerOff, ToggleLeft, ToggleRight, Tornado, Trash, Trash2, TreeDeciduous,
        Triangle, Trophy, Truck, Tv, Tv2, Type, Umbrella, Underline, Undo, Unlink, Unlock, Upload,
        UploadCloud, Usb, User, UserCheck, UserCircle, UserMinus, UserPlus, UserSquare, UserX, Users, Users2, Verified,
        Vibrate, Video, VideoOff, View, Voicemail, Volume, Volume1, Volume2, VolumeX,
        Wallet, Wallpaper, Wand, Wand2, Watch, Waves, Webcam, Webhook, Wheat, Wifi, WifiOff, Wind, Wine, Workflow,
        WrapText, Wrench, X, XCircle, XSquare, Zap, ZapOff, ZoomIn, ZoomOut,
    };
    const [searchQuery, setSearchQuery] = useState('');
    const icons = Object.keys(iconComponents);
    const filteredIcons = icons.filter(icon => 
        icon.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <Select onValueChange={(e) => props.onChange(e)}>
            <SelectTrigger className="w-[300px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select an icon" className="text-gray-800" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
                <div className="sticky top-0 p-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search icons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 bg-transparent"
                        />
                    </div>
                </div>
                <SelectGroup className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-2">
                    {filteredIcons.map((icon) => {
                        const IconComponent = iconComponents[icon as keyof typeof iconComponents];
                        return (
                            
                            <SelectItem 
                                key={icon}
                                value={icon}
                                
                                >
                                <div className="flex items-center gap-2 py-1 hover:text-red-500">
                                    <IconComponent className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-400">{icon}</span>
                                </div>
                            </SelectItem>
                        );
                    })}
                    {filteredIcons.length === 0 && (
                        <div className="text-center py-4 text-gray-400">
                            No icons found
                        </div>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};


export default LucideSelector