"use client";

import { useState, useRef } from "react";
import { Upload, Camera, Wand2, Download, Share2, Eye, Sparkles, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const designStyles = [
    { id: "modern", name: "Modern Minimalist", preview: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop&auto=format" },
    { id: "traditional", name: "Traditional", preview: "https://images.unsplash.com/photo-1556912167-f556f1ac6d93?w=150&h=150&fit=crop&auto=format" },
    { id: "industrial", name: "Industrial", preview: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&auto=format" },
    { id: "farmhouse", name: "Farmhouse", preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&auto=format" },
    { id: "scandinavian", name: "Scandinavian", preview: "https://images.unsplash.com/photo-1556909204-4aee10a7f3c6?w=150&h=150&fit=crop&auto=format" },
    { id: "mediterranean", name: "Mediterranean", preview: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=150&h=150&fit=crop&auto=format" },
];

const pricingPlans = [
    {
        name: "Starter",
        price: "$13",
        period: "/month",
        description: "Perfect for homeowners exploring design ideas",
        features: [
            "10 AI transformations per month",
            "5 design styles",
            "HD image downloads",
            "Basic sharing features",
            "Mobile app access"
        ],
        popular: false
    },
    {
        name: "Professional",
        price: "$24",
        period: "/month",
        description: "Ideal for designers and serious renovators",
        features: [
            "50 AI transformations per month",
            "25+ design styles",
            "4K image downloads",
            "Advanced sharing & collaboration",
            "Priority support",
            "Custom style training"
        ],
        popular: true
    },
    {
        name: "Business",
        price: "$99",
        period: "/month",
        description: "For contractors and design professionals",
        features: [
            "Unlimited AI transformations",
            "All 50+ design styles",
            "Commercial licensing",
            "White-label solutions",
            "API access",
            "Dedicated account manager",
            "Custom integrations"
        ],
        popular: false
    }
];

export default function AITransformPage() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [transformedImages, setTransformedImages] = useState<string[]>([]);
    const [transformationResults, setTransformationResults] = useState<any[]>([]);
    const [selectedStyle, setSelectedStyle] = useState(designStyles[0]);
    const [isTransforming, setIsTransforming] = useState(false);
    const [imageAnalysis, setImageAnalysis] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
                // Clear previous results when new image is uploaded
                setTransformedImages([]);
                setTransformationResults([]);
                setImageAnalysis(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTransform = async () => {
        if (!uploadedImage) return;

        setIsTransforming(true);
        setTransformedImages([]); // Clear previous results
        setTransformationResults([]); // Clear previous transformation details
        setImageAnalysis(null); // Clear previous analysis

        try {
            // Convert data URL to File object
            const response = await fetch(uploadedImage);
            const blob = await response.blob();
            const file = new File([blob], 'uploaded-image.jpg', { type: 'image/jpeg' });

            // Create form data
            const formData = new FormData();
            formData.append('image', file);
            formData.append('style', selectedStyle.id);

            // Call API
            const apiResponse = await fetch('/api/ai-transform', {
                method: 'POST',
                body: formData,
            });

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json();
                throw new Error(errorData.error || 'Failed to transform image');
            }

            const result = await apiResponse.json();
            console.log('AI Transform Result:', result);

            // Set analysis results from API response
            if (result.analysis) {
                setImageAnalysis(result.analysis);
            }

            // Set transformed images and details from API response
            if (result.transformations) {
                const imageUrls = result.transformations.map((t: any) => t.imageUrl);
                setTransformedImages(imageUrls);
                setTransformationResults(result.transformations);
            }

        } catch (error) {
            console.error('Transform error:', error);
            alert(`Error: ${error instanceof Error ? error.message : 'Failed to transform image'}`);
        } finally {
            setIsTransforming(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section - Inspired by RenovateAI */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            <Sparkles className="w-4 h-4 mr-1" />
                            AI-Powered Design Transform
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                            Your Co-Pilot for
                            <span className="block">Home Design</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Transform any room with AI-powered design visualization. Upload a photo, choose a style,
                            and watch your space come alive with professional design possibilities.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">1K+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Transformations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">50+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Design Styles</div>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-3xl font-bold text-yellow-500">4.8</span>
                                    <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">App Store Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Transform Interface */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl text-gray-900 dark:text-white">AI Design Transform Studio</CardTitle>
                            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                                Upload your space and watch AI create stunning design possibilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Upload Section */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                                        <Upload className="w-5 h-5" />
                                        Upload Your Space
                                    </h3>

                                    {!uploadedImage ? (
                                        <div
                                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors bg-white dark:bg-gray-800"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                                            <p className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Drop your photo here or click to upload</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Supports JPG, PNG, HEIC up to 10MB</p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img
                                                src={uploadedImage}
                                                alt="Uploaded space"
                                                className="w-full h-64 object-cover"
                                            />
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                Change Photo
                                            </Button>
                                        </div>
                                    )}

                                    {/* Style Selection */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Choose Design Style</h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {designStyles.map((style) => (
                                                <div
                                                    key={style.id}
                                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedStyle.id === style.id
                                                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                                                        }`}
                                                    onClick={() => setSelectedStyle(style)}
                                                >
                                                    <div className="aspect-square rounded mb-2 overflow-hidden">
                                                        <Image
                                                            src={style.preview}
                                                            alt={style.name}
                                                            width={150}
                                                            height={150}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-medium text-center text-gray-900 dark:text-white">{style.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Transform Button */}
                                    <Button
                                        onClick={handleTransform}
                                        disabled={!uploadedImage || isTransforming}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3"
                                    >
                                        {isTransforming ? (
                                            <>
                                                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                                                AI is transforming your space...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-4 h-4 mr-2" />
                                                Transform with AI
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Analysis Section */}
                                {imageAnalysis && (
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                                            <Eye className="w-5 h-5" />
                                            AI Analysis Results
                                        </h3>

                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                            {/* Uploaded Image Display */}
                                            {uploadedImage && (
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Uploaded Image</h4>
                                                    <div className="relative rounded-lg overflow-hidden max-w-md">
                                                        <Image
                                                            src={uploadedImage}
                                                            alt="Uploaded room image"
                                                            width={400}
                                                            height={300}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Room Details</h4>
                                                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <p><span className="font-medium text-gray-900 dark:text-white">Room Type:</span> <span className="capitalize">{imageAnalysis.roomType}</span></p>
                                                        <p><span className="font-medium text-gray-900 dark:text-white">Current Style:</span> <span className="capitalize">{imageAnalysis.currentStyle}</span></p>
                                                        <p><span className="font-medium text-gray-900 dark:text-white">Description:</span> {imageAnalysis.description}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Suggestions</h4>
                                                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                        {imageAnalysis.suggestions?.map((suggestion: string, index: number) => (
                                                            <li key={index} className="flex items-start gap-2">
                                                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                <span>{suggestion}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Results Section */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                                        <Eye className="w-5 h-5" />
                                        AI-Generated Designs
                                    </h3>

                                    {transformedImages.length === 0 ? (
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center bg-white dark:bg-gray-800">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400">Upload a photo and select a style to see AI transformations</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {transformationResults.map((transformation, index) => (
                                                <div key={transformation.id} className="relative rounded-xl overflow-hidden group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                    <div className="aspect-video relative">
                                                        <Image
                                                            src={transformation.imageUrl}
                                                            alt={transformation.description}
                                                            fill
                                                            className="object-cover transition-transform group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <Button size="sm" variant="secondary">
                                                                <Download className="w-4 h-4 mr-1" />
                                                                Download
                                                            </Button>
                                                            <Button size="sm" variant="secondary">
                                                                <Share2 className="w-4 h-4 mr-1" />
                                                                Share
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                                                                {transformation.style} Style
                                                            </h4>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {Math.round(transformation.confidence * 100)}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {transformation.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Pricing Section - RenovateAI Inspired */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Choose Your Design Journey</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            From exploring ideas to professional implementation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan) => (
                            <Card key={plan.name} className={`relative ${plan.popular
                                    ? 'border-purple-500 shadow-lg scale-105 bg-white dark:bg-gray-800'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                }`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-purple-600 text-white px-4 py-1">Most Popular</Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl text-gray-900 dark:text-white">{plan.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                        <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                                    </div>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={`w-full ${plan.popular
                                            ? 'bg-purple-600 hover:bg-purple-700'
                                            : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
                                        }`}>
                                        Start {plan.name}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Tabs */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Powerful AI Features</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Everything you need to visualize and plan your perfect space
                        </p>
                    </div>

                    <Tabs defaultValue="transform" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="transform">AI Transform</TabsTrigger>
                            <TabsTrigger value="staging">Virtual Staging</TabsTrigger>
                            <TabsTrigger value="exterior">Exterior Design</TabsTrigger>
                            <TabsTrigger value="landscape">Landscaping</TabsTrigger>
                        </TabsList>

                        <TabsContent value="transform" className="mt-8">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interior AI Transform</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Upload any interior photo and watch our AI transform it into stunning design possibilities.
                                                Choose from 50+ professional design styles and see instant results.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Instant AI-powered transformations</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">50+ professional design styles</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">4K resolution downloads</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center">
                                            <Wand2 className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="staging" className="mt-8">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Virtual Staging</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Transform empty rooms into beautifully furnished spaces. Perfect for real estate,
                                                moving homes, or planning furniture layouts.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Furniture placement AI</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Multiple furniture styles</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Real estate ready</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-xl flex items-center justify-center">
                                            <Eye className="w-16 h-16 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="exterior" className="mt-8">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exterior Design</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Reimagine your home's exterior with AI. Change colors, materials, roofing,
                                                and architectural elements to see your curb appeal potential.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Siding and paint colors</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Roofing materials</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Architectural features</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-xl flex items-center justify-center">
                                            <Camera className="w-16 h-16 text-orange-600 dark:text-orange-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="landscape" className="mt-8">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Landscape Design</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Transform your outdoor spaces with AI landscape design. Add gardens, pathways,
                                                patios, and outdoor living areas to enhance your property.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Garden and plant design</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Hardscape elements</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-700 dark:text-gray-300">Seasonal variations</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    );
}
