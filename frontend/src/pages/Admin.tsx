import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import {
  Users,
  Link2,
  Home,
  LogOut,
  Search,
  Eye,
  Shield,
  Calendar,
  Mail,
  MoreVertical,
  Ban,
  Trash2,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '../components/ui/pagination';
import { adminService, AdminUserDetail } from '../features/admin/services/admin.service';
import type { User } from '../types/auth.types';
import type { Link as AdminLink } from '../types/link.types';

interface AdminProps {
  onNavigate?: (page: string) => void;
}

const ITEMS_PER_PAGE = 8;

export function Admin({ onNavigate }: AdminProps = {}) {
  const { logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [users, setUsers] = useState<User[]>([]);
  const [links, setLinks] = useState<AdminLink[]>([]);
  const [isLoading, setIsLoading] = useState({ users: true, links: true });
  
  const [selectedUser, setSelectedUser] = useState<AdminUserDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for search and pagination
  const [userSearch, setUserSearch] = useState('');
  const [linkSearch, setLinkSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [linkPage, setLinkPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading({ users: true, links: true });
      try {
        const [usersData, linksData] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getAllLinks()
        ]);
        setUsers(usersData);
        console.log('Fetched users data:', usersData);
        setLinks(linksData);
      } catch (error) {
        toast.error('Failed to fetch admin data.');
      } finally {
        setIsLoading({ users: false, links: false });
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Memoized filtering for performance
  const filteredUsers = useMemo(() => users.filter((u: User) => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  ), [users, userSearch]);

  const filteredLinks = useMemo(() => links.filter((l: AdminLink) =>
    l.shortCode.toLowerCase().includes(linkSearch.toLowerCase()) ||
    l.originalUrl.toLowerCase().includes(linkSearch.toLowerCase()) ||
    (l.userId as User).name.toLowerCase().includes(linkSearch.toLowerCase()) // Explicitly cast to User
  ), [links, linkSearch]);

  // Memoized pagination
  const paginatedUsers = useMemo(() => filteredUsers.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE), [filteredUsers, userPage]);
  const paginatedLinks = useMemo(() => filteredLinks.slice((linkPage - 1) * ITEMS_PER_PAGE, linkPage * ITEMS_PER_PAGE), [filteredLinks, linkPage]);

  const totalUserPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const totalLinkPages = Math.ceil(filteredLinks.length / ITEMS_PER_PAGE);

  const handleViewUser = async (userId: string) => {
    toast.loading('Fetching user details...');
    try {
      const userDetails = await adminService.getUserDetails(userId);
      setSelectedUser(userDetails);
      setIsModalOpen(true);
      toast.dismiss();
    } catch (error) {
      toast.error("Failed to fetch user details.");
    }
  };
  
  // Placeholder actions
  const handleSuspendUser = (userId: string) => toast.warning(`Suspend action triggered for user ${userId}. (Not implemented)`);
  const handleDeleteUser = (userId: string) => toast.error(`Delete action triggered for user ${userId}. (Not implemented)`);

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate('home');
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-100 flex">
        {/* Sidebar */}
        <motion.aside initial={{ x: -100 }} animate={{ x: 0 }} className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col fixed h-screen z-10">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center gap-2"><div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div><div><span className="text-xl text-neutral-900">Admin</span><p className="text-xs text-neutral-500">Control Panel</p></div></div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Button variant={activeTab === 'overview' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('overview')} className="w-full justify-start gap-3"><Activity className="w-5 h-5" />Overview</Button>
            <Button variant={activeTab === 'users' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('users')} className="w-full justify-start gap-3"><Users className="w-5 h-5" />Users</Button>
            <Button variant={activeTab === 'links' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('links')} className="w-full justify-start gap-3"><Link2 className="w-5 h-5" />Links</Button>
          </nav>
          <div className="p-4 border-t border-neutral-200 space-y-2">
            <Button onClick={() => onNavigate && onNavigate('home')} variant="ghost" className="w-full justify-start gap-3 text-neutral-600"><Home className="w-5 h-5" />Back to Site</Button>
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-neutral-600"><LogOut className="w-5 h-5" />Logout</Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 bg-neutral-50">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Dashboard</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="links">Links</TabsTrigger></TabsList>
              
              <TabsContent value="overview">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card><CardHeader><p className="text-sm font-medium text-neutral-500">Total Users</p></CardHeader><CardContent><div className="text-3xl font-bold">{users.length.toLocaleString()}</div></CardContent></Card>
                    <Card><CardHeader><p className="text-sm font-medium text-neutral-500">Total Links</p></CardHeader><CardContent><div className="text-3xl font-bold">{links.length.toLocaleString()}</div></CardContent></Card>
                    <Card><CardHeader><p className="text-sm font-medium text-neutral-500">Total Clicks</p></CardHeader><CardContent><div className="text-3xl font-bold">{links.reduce((sum: number, link: AdminLink) => sum + link.clicks, 0).toLocaleString()}</div></CardContent></Card>
                </div>
                 <Card className="mt-6 p-6 text-center"><p className="text-neutral-600">More detailed analytics and system health metrics coming soon!</p></Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" /><Input placeholder="Search by name or email..." className="pl-10" value={userSearch} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserSearch(e.target.value)} /></div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Joined</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {isLoading.users ? (
                          <TableRow><TableCell colSpan={4} className="text-center h-24">Loading users...</TableCell></TableRow>
                        ) : paginatedUsers.map((user: User) => (
                          <TableRow key={user._id}>
                            <TableCell><div className="flex items-center gap-3"><div><div className="font-medium">{user.name}</div><div className="text-sm text-neutral-500">{user.email}</div></div></div></TableCell>
                            <TableCell><Badge variant="outline" className="capitalize">{user.role || 'user'}</Badge></TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleViewUser(user._id)}><Eye className="w-4 h-4 mr-2" />View Details</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSuspendUser(user._id)}><Ban className="w-4 h-4 mr-2" />Suspend User</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteUser(user._id)} className="text-red-600"><Trash2 className="w-4 h-4 mr-2" />Delete User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardHeader>
                    <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); setUserPage((p: number) => Math.max(1, p - 1)); }} disabled={userPage === 1} /></PaginationItem><span className="text-sm text-neutral-500">Page {userPage} of {totalUserPages}</span><PaginationItem><PaginationNext href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); setUserPage((p: number) => Math.min(totalUserPages, p + 1)); }} disabled={userPage === totalUserPages} /></PaginationItem></PaginationContent></Pagination>
                  </CardHeader>
                </Card>
              </TabsContent>

              <TabsContent value="links">
                <Card>
                  <CardHeader>
                    <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" /><Input placeholder="Search by URL, code, or owner..." className="pl-10" value={linkSearch} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkSearch(e.target.value)} /></div>
                  </CardHeader>
                  <CardContent>
                     <Table>
                      <TableHeader><TableRow><TableHead>Short Link</TableHead><TableHead>Owner</TableHead><TableHead>Clicks</TableHead><TableHead>Created</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {isLoading.links ? (
                          <TableRow><TableCell colSpan={4} className="text-center h-24">Loading links...</TableCell></TableRow>
                        ) : paginatedLinks.map((link: AdminLink) => (
                          <TableRow key={link._id}>
                            <TableCell><div className="font-mono text-sm">{link.shortCode}</div><div className="text-xs text-neutral-500 truncate max-w-xs">{link.originalUrl}</div></TableCell>
                            <TableCell><div>{(link.userId as User).name}</div><div className="text-xs text-neutral-500">{(link.userId as User).email}</div></TableCell>
                            <TableCell>{link.clicks}</TableCell>
                            <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardHeader>
                    <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); setLinkPage((p: number) => Math.max(1, p - 1)); }} disabled={linkPage === 1} /></PaginationItem><span className="text-sm text-neutral-500">Page {linkPage} of {totalLinkPages}</span><PaginationItem><PaginationNext href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); setLinkPage((p: number) => Math.min(totalLinkPages, p + 1)); }} disabled={linkPage === totalLinkPages} /></PaginationItem></PaginationContent></Pagination>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          {selectedUser ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedUser.user.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-4 pt-2">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4"/>{selectedUser.user.email}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/>Joined {new Date(selectedUser.user.createdAt).toLocaleDateString()}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4"><h3 className="font-semibold mb-2">Links Created ({selectedUser.links.length})</h3><div className="max-h-80 overflow-y-auto pr-2 border rounded-lg">
                  <Table>
                    <TableHeader><TableRow><TableHead>Short Code</TableHead><TableHead>Original URL</TableHead><TableHead>Clicks</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {selectedUser.links.length > 0 ? selectedUser.links.map((link: AdminLink) => (
                        <TableRow key={link._id}>
                          <TableCell className="font-mono">{link.shortCode}</TableCell>
                          <TableCell className="truncate max-w-sm">{link.originalUrl}</TableCell>
                          <TableCell>{link.clicks}</TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={3} className="text-center h-24">No links created by this user.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
              </div></div>
            </>
          ) : (<div>Loading...</div>)}
        </DialogContent>
      </Dialog>
    </>
  );
}