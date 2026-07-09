import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';
import 'features/auth/presentation/auth_provider.dart';

class InventarioApp extends StatelessWidget {
  const InventarioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<AuthProvider>(
      create: (_) => AuthProvider()..bootstrap(),
      builder: (context, _) {
        final auth = context.read<AuthProvider>();
        final appRouter = AppRouter(auth);
        return AppRouterHolder(
          router: appRouter.router,
          child: MaterialApp.router(
            title: 'Inventario QA',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.dark,
            routerConfig: appRouter.router,
          ),
        );
      },
    );
  }
}
