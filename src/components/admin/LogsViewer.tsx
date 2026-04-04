import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  getUserLogs, 
  getSystemLogs, 
  getUserActivities,
  UserLog,
  SystemLog,
  ActivityLog
} from '@/lib/supabase';
import { useAuth } from '@/stores/auth';
import { 
  Activity, 
  AlertTriangle, 
  Info, 
  Bug, 
  Eye, 
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

export function LogsViewer() {
  const { user } = useAuth();
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const loadLogs = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const [userLogsData, systemLogsData, activityLogsData] = await Promise.all([
        getUserLogs(user.id),
        getSystemLogs(selectedLevel === 'all' ? undefined : selectedLevel),
        getUserActivities(user.id)
      ]);
      
      setUserLogs(userLogsData);
      setSystemLogs(systemLogsData);
      setActivityLogs(activityLogsData);
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [user?.id, selectedLevel]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'debug':
        return <Bug className="h-4 w-4 text-gray-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'default';
      case 'debug':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const exportLogs = (type: 'user' | 'system' | 'activity') => {
    let data: any[] = [];
    let filename = '';
    
    switch (type) {
      case 'user':
        data = userLogs;
        filename = 'user_logs.json';
        break;
      case 'system':
        data = systemLogs;
        filename = 'system_logs.json';
        break;
      case 'activity':
        data = activityLogs;
        filename = 'activity_logs.json';
        break;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Logs do Sistema</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadLogs}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="user" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user">Logs do Usuário</TabsTrigger>
          <TabsTrigger value="system">Logs do Sistema</TabsTrigger>
          <TabsTrigger value="activity">Atividades</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Logs de Ações do Usuário
                <Badge variant="outline">{userLogs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {userLogs.map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{log.action}</Badge>
                          <Badge variant="secondary">{log.resource}</Badge>
                          {log.resource_id && (
                            <Badge variant="outline" className="text-xs">
                              ID: {log.resource_id}
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(log.created_at || '')}
                        </span>
                      </div>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      )}
                      {log.ip_address && (
                        <div className="text-xs text-muted-foreground mt-1">
                          IP: {log.ip_address}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportLogs('user')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1 border rounded-md"
            >
              <option value="all">Todos os níveis</option>
              <option value="error">Erro</option>
              <option value="warning">Aviso</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Logs do Sistema
                <Badge variant="outline">{systemLogs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          <Badge variant={getLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                          {log.user_id && (
                            <Badge variant="outline" className="text-xs">
                              User: {log.user_id}
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(log.created_at || '')}
                        </span>
                      </div>
                      <div className="text-sm mb-2">{log.message}</div>
                      {log.context && Object.keys(log.context).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.context, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportLogs('system')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Atividades do Usuário
                <Badge variant="outline">{activityLogs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{log.activity_type}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(log.created_at || '')}
                        </span>
                      </div>
                      <div className="text-sm mb-2">{log.description}</div>
                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportLogs('activity')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
