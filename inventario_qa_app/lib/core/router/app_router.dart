import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/auth_provider.dart';
import '../../features/auth/presentation/pages/login_page.dart';
import '../../features/auth/presentation/pages/register_page.dart';
import '../../features/productos/presentation/pages/catalogo_page.dart';
import '../../features/productos/presentation/pages/dashboard_page.dart';
import '../../features/productos/presentation/pages/detalle_page.dart';
import '../../features/productos/presentation/pages/not_found_page.dart';
import 'package:provider/provider.dart';

class AppRouter {
  AppRouter(this._auth);

  final AuthProvider _auth;

  late final GoRouter router = GoRouter(
    initialLocation: '/login',
    refreshListenable: _auth,
    redirect: (context, state) {
      final isAuth = _auth.isAuthenticated;
      final isAdmin = _auth.isAdmin;
      final loc = state.matchedLocation;

      final goingToAuth = loc == '/login' || loc == '/register';

      if (!isAuth) {
        return goingToAuth ? null : '/login';
      }

      if (goingToAuth) {
        return isAdmin ? '/dashboard' : '/catalogo';
      }

      if (loc == '/dashboard' && !isAdmin) {
        return '/catalogo';
      }
      if (loc == '/catalogo' && isAdmin) {
        return '/dashboard';
      }

      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (_, _) => const LoginPage()),
      GoRoute(path: '/register', builder: (_, _) => const RegisterPage()),
      GoRoute(path: '/catalogo', builder: (_, _) => const CatalogoPage()),
      GoRoute(path: '/dashboard', builder: (_, _) => const DashboardPage()),
      GoRoute(
        path: '/producto/:id',
        builder: (_, s) => DetallePage(id: s.pathParameters['id']!),
      ),
      GoRoute(path: '*', builder: (_, _) => const NotFoundPage()),
    ],
    errorBuilder: (_, s) => NotFoundPage(reason: s.error?.toString()),
  );

  static GoRouter of(BuildContext context) =>
      context.read<AppRouterHolder>().router;
}

class AppRouterHolder extends InheritedWidget {
  const AppRouterHolder({
    super.key,
    required this.router,
    required super.child,
  });

  final GoRouter router;

  static AppRouterHolder of(BuildContext context) {
    final h = context.dependOnInheritedWidgetOfExactType<AppRouterHolder>();
    assert(h != null, 'AppRouterHolder not found in widget tree');
    return h!;
  }

  @override
  bool updateShouldNotify(AppRouterHolder oldWidget) =>
      oldWidget.router != router;
}
